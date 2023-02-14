import { useAtomValue } from 'jotai';
import { a_grid_data, a_selected_tab, a_theme } from './atoms';
import HiGrid from './HiGrid';
import _ from 'lodash';
import { formatNumeric } from './utils';
import { COMPARE } from './const';

const TargetsBasePage = (props) => {
    const { columnHeaders, readOnly, isCellEditable, onAcceptChange, createNode, canSave, onSave } = props;
    const { nodes } = useAtomValue(a_grid_data);
    const theme = useAtomValue(a_theme);
    const tab = useAtomValue(a_selected_tab);

    const sectionSize = columnHeaders?.length;
    const compare = tab === COMPARE;

    const isnot = (value, test) => formatNumeric(value) !== formatNumeric(test);

    const getCellStyle = (node, col) => {
        const style = {};
        const level = node.key.length;
        const section = getSection(col, sectionSize);
        const values = node.data;
        const value = values[col];

        if (section === 3 && level === 1) {
            if (compare) {
                if (col === sectionSize * 3 && isnot(value, 0)) {
                    style.background = theme.warn;
                }
            } else if (isnot(value, 100)) {
                style.background = theme.warn;
            }
        } else if ((section === 2 && !node.children && +value) || (section === 3 && +values[col - sectionSize])) {
            style.background = theme.change;
        }

        return style;
    };

    const pnode = nodes?.length ? nodes[0] : null;
    const values = pnode?.data;
    const mincol = sectionSize * 2 + 1;
    const maxcol = mincol + sectionSize - 1 - (compare ? 1 : 0);
    const weights = _.filter(values, (v, col) => col >= mincol && col <= maxcol);
    const warn = _.some(weights, w => isnot(w, 100)) || (compare && isnot(_.last(values), 0));

    return <HiGrid columnHeaders={columnHeaders}
        sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        readOnly={readOnly} isCellEditable={isCellEditable} getCellStyle={getCellStyle} warn={warn}
        onAcceptChange={onAcceptChange} createNode={createNode} canSave={canSave} onSave={onSave} />;
};

export default TargetsBasePage;

export const getSection = (col, sectionSize) => col ? _.floor((col - 1) / sectionSize) + 1 : 0;
