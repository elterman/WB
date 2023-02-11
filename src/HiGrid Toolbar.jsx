import SvgInfo from './Icons/Svg Info';
import SvgAddChild from './Icons/Svg Add Child';
import SvgAddSibling from './Icons/Svg Add Sibling';
import { useTooltip } from './Tooltip';
import _ from 'lodash';
import { Fragment } from 'react';
import { OFF_WHITE, WHITE } from './const';
import { useAtomValue } from 'jotai';
import { a_selected_cell, a_targets_meta } from './atoms';

const HiGridToolbar = (props) => {
    const { style } = props;
    const tooltip = useTooltip();
    const meta = useAtomValue(a_targets_meta);
    const selectedCell = useAtomValue(a_selected_cell);
    const leaf = !meta[selectedCell.key].node.children;

    const renderHelp = () => {
        const help = [
            ['Press...', 'To...'],
            ['Spacebar, or F2, or Enter', 'Edit Cell'],
            ['1,2...', 'Collapse All at Level 1,2... and below'],
            ['0', 'Expand All'],
            ['Alt+Left, Alt+Right', 'Collapse/Expand Node'],
            ['Home, End', 'Go to Start, End of Row '],
            ['Ctrl+Home, Ctrl+End', 'Go to Upper Left, Bottom Right'],
            ['Alt+Up, Alt+Down', 'Go to Sibling'],
            ['Ctrl+Al+Up or Backspace', 'Go to Parent'],
            ['Ctrl+Up, Ctrl+Down', 'Scroll Vertically'],
            ['Ctrl-Left, Ctrl+Right', 'Scroll Horizontally'],
        ];

        return <div style={{ display: 'grid', grid: 'auto / auto 1fr', gap: '5px 10px' }}>
            {_.map(help, (line, i) => {
                const color = i ? OFF_WHITE : WHITE;

                return <Fragment key={i}>
                    <span style={{ gridArea: `${i + 1}/1`, color }}>{line[0]}</span>
                    <span style={{ gridArea: `${i + 1}/2`, color }}>{line[1]}</span>
                </Fragment>;
            })}
        </div>;
    };

    return <div className='higrid-toolbar' style={{ ...style }}>
        <div onMouseEnter={(e) => tooltip.show({ e, text: renderHelp, style: { maxWidth: '500px', paddingRight: '20px' } })}
            onMouseLeave={tooltip.hide}>
            <SvgInfo width={24} />
        </div>
        <div />
        <div />
        <SvgAddChild width={25} disabled={leaf} />
        <SvgAddSibling width={25} above={true} disabled={!leaf} />
        <SvgAddSibling width={25} disabled={!leaf} />
    </div>;
};

export default HiGridToolbar;