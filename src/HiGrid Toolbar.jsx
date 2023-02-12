import SvgInfo from './Icons/Svg Info';
import SvgAddChild from './Icons/Svg Add Child';
import SvgAddSibling from './Icons/Svg Add Sibling';
import SvgDeleteNode from './Icons/Svg Delete Node';
import SvgSave from './Icons/Svg Save';
import SvgSaveLocal from './Icons/Svg Save Local';
import { useTooltip } from './Tooltip';
import _ from 'lodash';
import { Fragment } from 'react';
import { OFF_WHITE, WHITE } from './const';
import { useAtomValue } from 'jotai';
import { a_funds_to_add, a_selected_cell, a_targets } from './atoms';
import DropdownSelector from './Dropdown Selector';
import Button from './Button';

const HiGridToolbar = (props) => {
    const { onAddNode, onDeleteNode, canSave, onSave, style } = props;
    const tooltip = useTooltip();
    const { meta } = useAtomValue(a_targets);
    const selectedCell = useAtomValue(a_selected_cell);
    const node = meta[selectedCell.key].node;
    const leaf = !node.children;
    const fundsToAdd = useAtomValue(a_funds_to_add);

    const renderHelp = () => {
        const help = [
            ['Press...', 'To...'],
            ['Spacebar, or F2, or Enter', 'Edit Cell'],
            ['Delete', 'Set Trade Cell to 0%'],
            ['1,2...', 'Collapse All from Level 1,2... down'],
            ['0', 'Expand All'],
            ['Ctrl + Alt + ⇦/⇨', 'Collapse/Expand Row'],
            ['Shift + Ctrl + Alt + ⇦/⇨', 'Collapse/Expand Row Recursively'],
            ['Home, End', 'Go to Start, End of Row '],
            ['Ctrl + Home, Ctrl + End', 'Go to Upper Left, Bottom Right'],
            ['Alt + ⇧/⇩', 'Go to Sibling'],
            ['Ctrl + Alt + ⇧, or Backspace', 'Go to Parent'],
            ['Ctrl + ⇧/⇩', 'Scroll Vertically'],
            ['Ctrl + ⇦/⇨', 'Scroll Horizontally'],
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

    const size = 25;
    const buttonStyle = { background: 'none', padding: 0 };

    return <div className='higrid-toolbar' style={{ ...style }}>
        <div onMouseEnter={(e) => tooltip.show({ e, text: renderHelp, style: { maxWidth: '500px', paddingRight: '20px' } })}
            onMouseLeave={tooltip.hide}>
            <SvgInfo width={24} />
        </div>
        <div/>
        {_.map(['child', 'above', 'below'], (pos, i) => <div key={i}><DropdownSelector id={`add-${pos}`} items={_.keys(fundsToAdd)}
            setItem={item => onAddNode(item, pos)} offset='left' disabled={!!leaf !== !!i} style={buttonStyle}
            icon={i === 0 ? <SvgAddChild width={size} disabled={leaf} /> :
                i === 1 ? <SvgAddSibling above width={size} disabled={!leaf} /> :
                    i === 2 ? <SvgAddSibling width={size} disabled={!leaf} /> : null} />
        </div>)}
        <div onClick={() => onDeleteNode(node)}><SvgDeleteNode width={size} disabled={!node.canDelete} /></div>
        <div/>
        <Button style={buttonStyle} onClick={() => onSave(false)}><SvgSave width={size} disabled={!canSave.global} /></Button>
        <Button style={buttonStyle} onClick={() => onSave(true)}><SvgSaveLocal width={size} disabled={!canSave.local} /></Button>
    </div>;
};

export default HiGridToolbar;