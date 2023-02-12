import { useAtom, useAtomValue } from 'jotai';
import { a_lite, a_originals, a_selected_family, a_targets, a_theme } from './atoms';
import HiGrid from './HiGrid';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { parentKey } from './Foldable Utils';
import { formatNumeric } from './utils';
import { useForceUpdate } from '@react-spring/shared';

const TargetsPage = () => {
    const renderComingSoon = useComingSoon();
    const fob = useAtomValue(a_selected_family);
    const atom = a_targets;
    const { nodes, meta } = useAtomValue(atom);
    const json = JSON.stringify(nodes);
    const theme = useAtomValue(a_theme);
    const [originals, setOriginals] = useAtom(a_originals);
    const forceUpdate = useForceUpdate(true);

    if (fob.fname && fob.fname !== 'BFAF') {
        return renderComingSoon();
    }

    const columnHeaders = fob.members;
    const sectionSize = columnHeaders?.length;

    const getSection = (col) => col ? _.floor((col - 1) / sectionSize) + 1 : 0;

    const getCellStyle = (node, col) => {
        const style = {};
        const level = node.key.length;
        const section = getSection(col);
        const values = node.item;
        const value = values[col];

        if (section === 3 && level === 1 && formatNumeric(value) !== '100.0') {
            style.background = theme.alert;
        } else if ((section === 2 && !node.children && +value) || (section === 3 && +values[col - sectionSize])) {
            style.background = theme.change;
        }

        return style;
    };

    const isCellEditable = cell => {
        const col = cell.col;
        const section = getSection(col);

        if (section !== 2) {
            return;
        }

        return !meta[cell.key].node.children;
    };

    const onAcceptChange = (cell, value) => {
        if (value === '') {
            return;
        }

        const trade = +value;

        let node = meta[cell.key].node;
        node.item[cell.col] = trade;

        // final weight = target + trade
        const wcol = cell.col + sectionSize;
        const target = node.item[cell.col - sectionSize] || 0;
        node.item[wcol] = target + trade;

        const updateTotal = (key, col) => {
            if (_.isEmpty(key)) {
                return;
            }

            node = meta[key].node;
            let total = 0;

            _.each(node.children, n => {
                total += n.item[col];
            });

            node.item[col] = total;

            updateTotal(parentKey(key), col);
        };

        const key = parentKey(cell.key);
        updateTotal(key, cell.col);
        updateTotal(key, wcol);

        forceUpdate();
    };

    const createNode = (name) => {
        const item = [name, ..._.fill(Array(sectionSize), ''), ..._.fill(Array(sectionSize * 2), 0)];
        const node = { item, canDelete: true };

        return node;
    };

    const onSave = local => {
        const orgs = { ...originals };
        orgs[local ? 'local' : 'global'] = json;
        setOriginals(orgs);
    };

    const pnode = nodes?.length ? nodes[0] : null;
    const values = pnode?.item;
    const mincol = sectionSize * 2 + 1;
    const maxcol = mincol + sectionSize - 1;
    const weights = _.filter(values, (v, col) => col >= mincol && col <= maxcol);
    const alert = _.some(weights, w => formatNumeric(w) !== '100.0');

    const canSave = { local: json !== originals.local, global: json !== originals.global };

    return <HiGrid atom={atom} columnHeaders={columnHeaders} sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        readOnly={false} isCellEditable={isCellEditable} getCellStyle={getCellStyle} alert={alert}
        onAcceptChange={onAcceptChange} createNode={createNode} canSave={canSave} onSave={onSave} />;
};

export default TargetsPage;
