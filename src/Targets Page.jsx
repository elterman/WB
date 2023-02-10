import { useAtomValue } from 'jotai';
import { a_lite, a_selected_family, a_targets } from './atoms';
import HiGrid from './HiGrid';
import { useComingSoon } from './hooks';
import _ from 'lodash';
import { PINK } from './const';
import { parentKey } from './Collapsible Utils';
import { formatNumeric } from './utils';

const TargetsPage = () => {
    const renderComingSoon = useComingSoon();
    const fob = useAtomValue(a_selected_family);
    const atom = a_targets;
    const { meta } = useAtomValue(atom);
    const lite = useAtomValue(a_lite);

    if (fob.fname && fob.fname !== 'BFAF') {
        return renderComingSoon();
    }

    const columnHeaders = fob.members;
    const sectionSize = columnHeaders?.length;

    const getSection = (col) => col ? _.floor((col - 1) / sectionSize) + 1 : 0;

    const getCellStyle = (node, col) => {
        let background = 'none';

        const section = getSection(col);
        const values = node.item;
        const value = values[col];

        if (section === 3 && node.key.length === 1 && formatNumeric(value) !== '100.0') {
            background = lite ? PINK : 'brown';
        } else if ((section === 2 && !node.children && +value) || (section === 3 && +values[col - sectionSize])) {
            background = lite ? '#A2C0D9' : '#506C85';
        }

        return { background };
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

        let node = meta[cell.key].node;
        node.item[cell.col] = +value;

        // update final weight = target + trade
        const wcol = cell.col + sectionSize;
        node.item[wcol] = +value + node.item[cell.col - sectionSize];

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
    };

    return <HiGrid atom={atom} columnHeaders={columnHeaders} sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        readOnly={false} isCellEditable={isCellEditable} getCellStyle={getCellStyle} onAcceptChange={onAcceptChange} />;
};

export default TargetsPage;
