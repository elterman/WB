import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { a_grid_data, a_saving, a_originals, a_selected_family, a_compare_meta, a_compare_input } from './atoms';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { parentKey } from './Foldable Utils';
import { useForceUpdate } from '@react-spring/shared';
import TargetsBasePage, { getSection } from './Targets Base Page';
import { str } from './utils';

const TradesPage = () => {
    const renderComingSoon = useComingSoon();
    const fob = useAtomValue(a_selected_family);
    const { nodes, meta } = useAtomValue(a_grid_data);
    const json = JSON.stringify(nodes);
    const [originals, setOriginals] = useAtom(a_originals);
    const canSave = { local: json !== originals.local, global: json !== originals.global };
    const forceUpdate = useForceUpdate(true);
    const setSaving = useSetAtom(a_saving);
    const cometa = useAtomValue(a_compare_meta);
    const { fname1, fname2 } = useAtomValue(a_compare_input);

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

        const key = parentKey(cell.key);
        updateTotal(meta, key, cell.col);
        updateTotal(meta, key, wcol);

        updateCompare(cell, trade);

        forceUpdate();
    };

    const updateTotal = (meta, key, col) => {
        if (_.isEmpty(key)) {
            return;
        }

        const node = meta[key].node;
        let total = 0;

        _.each(node.children, n => {
            total += n.data[col];
        });

        node.data[col] = total;

        updateTotal(meta, parentKey(key), col);
    };

    const updateCompare = (cell, trade) => {
        const i = (cell.col - 1) % sectionSize;
        const header = columnHeaders[i];

        const col = header === fname1 ? 4 : header === fname2 ? 5 : null;

        if (!col) {
            return;
        }

        const name = meta[str(cell.key)].node.data[0];
        let key = keyByName(name, cometa);

        if (!key) {
            alert(`${name} could not be found in Compare.`);
            return;
        }

        let node = cometa[key].node;
        node.data[col] = trade;

        // final weight = target + trade
        const target = node.data[col - 3] || 0;
        node.data[col + 3] = target + trade;

        // deltas
        node.data[6] = node.data[4] - node.data[5];
        node.data[9] = node.data[7] - node.data[8];

        key = parentKey(cell.key);
        updateTotal(cometa, key, col);
        updateTotal(cometa, key, 6);
        updateTotal(cometa, key, col + 3);
        updateTotal(cometa, key, 9);
    };

    const keyByName = (name, meat) => _.findKey(meta, mob => mob.node.data[0] === name);

    const createNode = (name) => {
        const data = [name, ..._.fill(Array(sectionSize), ''), ..._.fill(Array(sectionSize * 2), 0)];
        return { data, canDelete: true };
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
