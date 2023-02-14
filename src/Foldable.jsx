import { useAtom } from 'jotai';
import _ from 'lodash';
import { Fragment } from 'react';
import { parentKey } from './Foldable Utils';
import Icon from './Icons/Svg Foldable';

export const LEVEL_INDENT = 20;
const DEFAULT_SHADES = ['#FFFFFF10', '#FFFFFF18', '#FFFFFF20', '#FFFFFF28', '#FFFFFF30', '#FFFFFF38', '#FFFFFF40', '#FFFFFF48'];

const Foldable = (props) => {
    let { id = 'foldable', nodes, maxLevel = Number.MAX_SAFE_INTEGER, flat, render } = props;
    let { shades = DEFAULT_SHADES, atom, onToggleFold, toggleColor } = props;
    const [meta, setMeta] = useAtom(atom);

    const renderNode = (node) => {
        const hasChildren = !_.isEmpty(node?.children);

        const handleToggle = () => {
            if (!hasChildren) {
                return;
            }

            const mob = meta[node.key];
            mob.folded = !mob.folded;
            setMeta({ ...meta });

            onToggleFold && onToggleFold(node.key.length, mob.folded);
        };

        const doRender = () => {
            const level = node.key.length;
            const indent = flat ? 0 : `${(level - 1) * LEVEL_INDENT + (hasChildren ? 0 : 24)}px`;
            const background = shades[level - 1];

            const renderToggle = () => {
                const classes = `foldable-toggle ${!folded && hasChildren ? 'foldable-toggle-expanded' : ''}`;
                const opacity = hasChildren ? 1 : 0;
                const cursor = hasChildren ? 'pointer' : 'auto';

                return <div style={{ opacity, cursor, display: 'grid' }}>
                    <div className={classes} onClick={handleToggle}>
                        <Icon width={12} color={toggleColor} />
                    </div>
                </div>;
            };

            return (
                <div className='foldable-row' style={{ background }}>
                    <div className='foldable-item' style={{ marginLeft: indent }}>
                        {!flat && hasChildren && renderToggle()}
                        {_.isFunction(node.item) ? node.item(node) : render ? render(node) : (node.item || '•••')}
                    </div>
                </div>
            );
        };

        const parentFolded = () => {
            if (!node.key) {
                return false;
            }

            const key = parentKey(node.key);
            return meta[key]?.folded;
        };

        if (parentFolded(node)) {
            return null;
        }

        const folded = node.key && meta[node.key].folded;
        const level = node.key ? node.key.length : 0;
        const nid = `${id}-${node.key || 0}`;

        return <div id={nid} className='foldable'>
            {node.key && doRender()}
            {!folded && level < maxLevel && _.map(node.children, (child, i) =>
                <Fragment key={i}>{renderNode(child)}</Fragment>)}
        </div>;
    };

    return <>{_.map(nodes, (node, i) => <Fragment key={i}>{renderNode(node)}</Fragment>)}</>;
};

export default Foldable;