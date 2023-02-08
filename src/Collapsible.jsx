import { useAtom } from 'jotai';
import _ from 'lodash';
import SvgCollapsible from './Icons/Svg Collapsible';
import { parentKey } from './utils';

export const LEVEL_INDENT = 20;
const DEFAULT_SHADES = ['#FFFFFF10', '#FFFFFF18', '#FFFFFF20', '#FFFFFF28', '#FFFFFF30', '#FFFFFF38', '#FFFFFF40', '#FFFFFF48'];

const Collapsible = (props) => {
    let { node, maxLevel = Number.MAX_SAFE_INTEGER, flat, render, shades = DEFAULT_SHADES, atom, onToggleCollapsed, color } = props;
    const [ meta, setMeta] = useAtom(atom);
    const hasChildren = !_.isEmpty(node?.children);

    const handleToggle = () => {
        if (!hasChildren) {
            return;
        }

        const mob = meta[node.key];
        mob.collapsed = !mob.collapsed;
        setMeta({ ...meta });

        onToggleCollapsed && onToggleCollapsed(node.key.length, mob.collapsed);
    };

    const renderItem = () => {
        const level = node.key.length;
        const indent = flat ? 0 : `${(level - 1) * LEVEL_INDENT}px`;
        const background = shades[level - 1];
        const opacity = hasChildren ? 1 : 0;
        const cursor = hasChildren ? 'pointer' : 'auto';
        const classes = `collapsible-toggle ${!collapsed && hasChildren ? 'collapsible-toggle-expanded' : ''}`;

        return (
            <div className='collapsible-row' style={{ background }}>
                <div className='collapsible-item' style={{ marginLeft: indent, }}>
                    {<div style={{ opacity, cursor, display: `${flat ? 'none' : 'grid'}` }}>
                        <div className={classes} onClick={handleToggle}>
                            <SvgCollapsible width={12} color={color || '#FFF'} />
                        </div>
                    </div>}
                    {_.isFunction(node.item) ? node.item(node) : render ? render(node) : (node.item || '•••')}
                </div>
            </div>
        );
    };

    const parentCollapsed = () => {
        if (!node.key) {
            return false;
        }

        const key = parentKey(node.key);
        return meta[key]?.collapsed;
    };

    if (parentCollapsed(node)) {
        return null;
    }

    const collapsed = node.key && meta[node.key].collapsed;
    const level = node.key ? node.key.length : 0;

    return (
        <div className='collapsible'>
            {node.key && renderItem()}
            {!collapsed && level < maxLevel && _.map(node.children, (child, i) =>
                <Collapsible key={i} node={child} maxLevel={node.maxLevel} flat={flat} color={color}
                    render={render} shades={shades} atom={atom} onToggleCollapsed={onToggleCollapsed} />)}
        </div>
    );
};

export default Collapsible;