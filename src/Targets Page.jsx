import { useAtomValue } from 'jotai';
import { a_lite, a_selected_family, a_targets } from './atoms';
import SheetView from './Sheet View';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { useState } from 'react';

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
                background = lite ? '#F88F9E' : '#863C3C';
            }
        }

        return { background };
    };

    const onEdit = (cell) => {
        if (!cell) {
            setEditCell(null);
            return;
        }

        const col = cell.col;
        const section = getSection(col);

        if (section !== 2) {
            return;
        }

        const leaf = !meta[cell.key].hasChildren;

        if (leaf) {
            setEditCell(cell);
        }

    };

    return <SheetView atom={atom} columnHeaders={columnHeaders}
        sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        editCell={editCell} onEdit={onEdit} getCellStyle={getCellStyle} />;
};

export default TargetsPage;
