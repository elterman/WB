import SvgAddChild from './Icons/Svg Add Child';
import SvgAddSibling from './Icons/Svg Add Sibling';
import SvgDeleteNode from './Icons/Svg Delete Node';
import SvgSave from './Icons/Svg Save';
import SvgSaveLocal from './Icons/Svg Save Local';
import _ from 'lodash';
import { useAtomValue } from 'jotai';
import { a_funds_to_add, a_selected_cell, a_grid_data } from './atoms';
import DropdownSelector from './Dropdown Selector';
import Button from './Button';
import InfoTool from './Info Tool';

const HiGridToolbar = (props) => {
    const { onAddNode, onDeleteNode, canSave, onSave, style } = props;
    const { meta } = useAtomValue(a_grid_data);
    const selectedCell = useAtomValue(a_selected_cell);
    const node = meta[selectedCell.key].node;
    const leaf = !node.children;
    const fundsToAdd = useAtomValue(a_funds_to_add);

    const renderAddButton = (pos, icon, disabled) => <DropdownSelector id={`add-${pos}`} items={_.keys(fundsToAdd)}
        setItem={item => onAddNode(item, pos)} offset='left' disabled={disabled} style={buttonStyle} icon={icon} />;

    const size = 25;
    const buttonStyle = { background: 'none', padding: 0 };

    return <div id='toolbar' className='toolbar' style={{ ...style }}>
        <InfoTool />
        {onAddNode && <>
            <div />
            {renderAddButton('child', <SvgAddChild width={size} disabled={leaf} />, leaf)}
            {renderAddButton('above', <SvgAddSibling above width={size} disabled={!leaf} />, !leaf)}
            {renderAddButton('below', <SvgAddSibling width={size} disabled={!leaf} />, !leaf)}
        </>}
        {onDeleteNode && <div id='delete-node' onClick={() => onDeleteNode(node)}>
            <SvgDeleteNode width={size} disabled={!node.canDelete} />
        </div>}
        {onSave && <>
            <div />
            <Button id='save-local' style={buttonStyle} onClick={() => onSave(false)}>
                <SvgSave width={size} disabled={!canSave.global} />
            </Button>
            <Button id='save-global' style={buttonStyle} onClick={() => onSave(true)}>
                <SvgSaveLocal width={size} disabled={!canSave.local} />
            </Button>
        </>}
    </div>;
};

export default HiGridToolbar;