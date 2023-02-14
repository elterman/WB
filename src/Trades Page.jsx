import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { a_grid_data, a_saving, a_originals, a_selected_family } from './atoms';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { parentKey } from './Foldable Utils';
import { useForceUpdate } from '@react-spring/shared';
import TargetsBasePage, { getSection } from './Targets Base Page';

const TradesPage = () => {
    const renderComingSoon = useComingSoon();
    const fob = useAtomValue(a_selected_family);
    const { nodes, meta } = useAtomValue(a_grid_data);
    const json = JSON.stringify(nodes);
    const [originals, setOriginals] = useAtom(a_originals);
    const canSave = { local: json !== originals.local, global: json !== originals.global };
    const forceUpdate = useForceUpdate(true);
    const setSaving = useSetAtom(a_saving);

    if (fob.fname && fob.fname !== 'BFAF') {
        return renderComingSoon();
    }

    const columnHeaders = fob.members;
    const sectionSize = columnHeaders?.length;

    const isCellEditable = cell => {
        const col = cell.col;
        const section = getSection(col, sectionSize);

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
        node.data[cell.col] = trade;

        // final weight = target + trade
        const wcol = cell.col + sectionSize;
        const target = node.data[cell.col - sectionSize] || 0;
        node.data[wcol] = target + trade;

        const updateTotal = (key, col) => {
            if (_.isEmpty(key)) {
                return;
            }

            node = meta[key].node;
            let total = 0;

            _.each(node.children, n => {
                total += n.data[col];
            });

            node.data[col] = total;

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
        setSaving(true);

        _.delay(() => {
            const orgs = { ...originals };
            orgs[local ? 'local' : 'global'] = json;
            setOriginals(orgs);

            setSaving(false);
        }, 1000);
    };

    return <TargetsBasePage columnHeaders={columnHeaders} readOnly={false} isCellEditable={isCellEditable}
        onAcceptChange={onAcceptChange} createNode={createNode} canSave={canSave} onSave={onSave} />;
};

export default TradesPage;
