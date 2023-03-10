import SvgInfo from './Icons/Svg Info';
import { useTooltip } from './Tooltip';
import _ from 'lodash';
import { Fragment } from 'react';
import { TRADE, OFF_WHITE, WHITE } from './const';
import { useAtomValue } from 'jotai';
import { a_selected_tab } from './atoms';

const InfoTool = () => {
    const tooltip = useTooltip();
    const selectedTab = useAtomValue(a_selected_tab);
    const canEdit = selectedTab === TRADE;

    const renderHelp = () => {
        const help = [
            ['Press...', 'To...'],
            ['1,2...', 'Collapse All from Level 1,2... down'],
            ['0, or 1 twice', 'Expand All'],
            ['Ctrl + Alt + ⇦/⇨', 'Collapse/Expand Row'],
            ['Shift + Ctrl + Alt + ⇦/⇨', 'Collapse/Expand Row Recursively'],
            ['Home, End', 'Go to Start, End of Row '],
            ['Ctrl + Home, Ctrl + End', 'Go to Upper Left, Bottom Right'],
            ['Alt + ⇧/⇩', 'Go to Sibling'],
            ['Ctrl + Alt + ⇧, or Backspace', 'Go to Parent'],
            ['Ctrl + ⇧/⇩', 'Scroll Vertically'],
            ['Ctrl + ⇦/⇨', 'Scroll Horizontally'],
            ['p, P', 'Browse Grid Palettes'],
        ];

        if (canEdit) {
            help.splice(1, 0, ['Spacebar, or F2, or Enter', 'Edit Cell'], ['Delete', 'Set Trade Cell to 0%']);
        }

        return <div id='cheat-sheet'>
            {_.map(help, (line, i) => {
                const color = i ? OFF_WHITE : WHITE;

                return <Fragment key={i}>
                    <span style={{ gridArea: `${i + 1}/1`, color }}>{line[0]}</span>
                    <span style={{ gridArea: `${i + 1}/2`, color }}>{line[1]}</span>
                </Fragment>;
            })}
        </div>;
    };

    return <div id='info-tool' onMouseEnter={(e) => tooltip.show({ e, text: renderHelp, style: { maxWidth: '500px', paddingRight: '20px' } })}
        onMouseLeave={tooltip.hide}><SvgInfo width={24} />
    </div>;
};

export default InfoTool;