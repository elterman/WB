import { useAtomValue } from 'jotai';
import { a_lite, a_selected_family, a_targets } from './atoms';
import SheetView from './Sheet View';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { useState } from 'react';
import { DARK_EDIT, LITE_EDIT } from './const';

const TargetsPage = () => {
    const renderComingSoon = useComingSoon();
    const fob = useAtomValue(a_selected_family);
    const atom = a_targets;
    const { meta } = useAtomValue(atom);
    const lite = useAtomValue(a_lite);
    const [editCell, setEditCell] = useState(null);

    if (fob.fname && fob.fname !== 'BFAF') {
        return renderComingSoon();
    }

    const columnHeaders = fob.members;

    const getSection = (col) => col ? _.floor((col - 1) / columnHeaders.length) + 1 : 0;

    const getCellStyle = (node, col) => {
        let background = 'none';

        if (!node.children) {
            const section = getSection(col);
            const values = node.item;
            const value = values[col];

            if ((section === 2 && +value) || (section === 3 && +values[col - columnHeaders.length])) {
                background = lite ? LITE_EDIT : DARK_EDIT;
            }
        }

        return { background };
    };

    const cellEditable = cell => {
        const col = cell.col;
        const section = getSection(col);

        if (section !== 2) {
            return;
        }

        return !meta[cell.key].node.children;
    };

    const onEdit = (cell) => {
        if (!cell) {
            setEditCell(null);
        } else if (cellEditable(cell)) {
            setEditCell(cell);
        };
    };

    const getEditValue = cell => {
        const value = meta[cell.key].node.item[cell.col];
        return value;
    };

    return <SheetView atom={atom} columnHeaders={columnHeaders} sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        editCell={editCell} onEdit={onEdit} cellEditable={cellEditable} getEditValue={getEditValue} getCellStyle={getCellStyle} />;
};

export default TargetsPage;
