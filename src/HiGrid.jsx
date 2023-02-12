import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import _ from 'lodash';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { a_lite, a_palette, a_selected_cell, a_targets } from './atoms';
import Foldable, { LEVEL_INDENT } from './Foldable';
import { cellBox, cellId, nodeVisible, parentKey, split, splitKey } from './Foldable Utils';
import { APP_BACKGROUND, PALETTES, GOLD, LAVENDER, OFF_BACKGROUND, OFF_WHITE, LEFT, RIGHT, UP, DOWN, GOTO_PARENT } from './const';
import { useForceUpdate } from './hooks';
import { useTooltip } from './Tooltip';
import { getBox, hasScrollbar, syncScroll, windowSize, formatNumeric, str, same } from './utils';
import HiGridToolbar from './HiGrid Toolbar';

const ROW_SIZE = 29;
const CELL_SIZE = 70;
const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';
const BOTTOM_LEFT = 'bottom-left';
const BOTTOM_RIGHT = 'bottom-right';

const HiGrid = (props) => {
    const { atom, columnHeaders, sectionHeaders, readOnly, isCellEditable, getCellStyle, alert } = props;
    const { onAcceptChange, createNode, canSave = { local: false, global: false }, onSave } = props;
    const { nodes, metaAtom } = useAtomValue(atom);
    const [meta, setMeta] = useAtom(metaAtom);
    const setTargets = useSetAtom(a_targets);
    const lite = useAtomValue(a_lite);
    const [selectedCell, setSelectedCell] = useAtom(a_selected_cell);
    const [editing, setEditing] = useState(null);
    const forceUpdate = useForceUpdate(true);
    const tooltip = useTooltip();
    const paletteKey = useAtomValue(a_palette);
    const gh_ref = useRef(null);
    const gh = gh_ref.current;
    const tr_ref = useRef(null);
    const tr = tr_ref.current;
    const bl_ref = useRef(null);
    const bl = bl_ref.current;
    const br_ref = useRef(null);
    const br = br_ref.current;
    const nsections = sectionHeaders?.length || 1;
    const ncols = 1 + nsections * (columnHeaders?.length || 0);
    const palette =  PALETTES[paletteKey];
    const l = useRef({}).current;

    useEffect(() => {
        window.addEventListener('resize', forceUpdate);
        return () => window.removeEventListener('resize', forceUpdate);
    }, [forceUpdate]);

    useEffect(() => {
        forceUpdate();
        l.view?.focus();
    }, [forceUpdate, l.view]);

    const scrollIntoView = useCallback(cell => {
        const cbox = cellBox(cell);

        let part = br;
        let sbox = getBox(part);

        if (sbox.height) {
            if (cbox.top < sbox.top) {
                part.scrollBy(0, cbox.top - sbox.top);
            } else if (cbox.bottom > sbox.bottom - 12) {
                part.scrollBy(0, cbox.bottom - sbox.bottom + 12);
            }
        }

        if (!sbox.height) {
            part = tr;
            sbox = getBox(part);
        }

        if (cbox.left < sbox.left) {
            part.scrollBy(cbox.left - sbox.left, 0);
        } else if (cbox.right > sbox.right - 12) {
            part.scrollBy(cbox.right - sbox.right + 12, 0);
        }
    }, [br, tr]);

    const onNavigate = useCallback(e => {
        if (l.keydown) {
            return;
        }

        l.timeout = _.delay(() => {
            clearTimeout(l.timeout);
            l.timeout = null;
            l.keydown = false;
        });

        let cell = null;
        const _case = e.key === UP && e.ctrlKey && e.altKey ? GOTO_PARENT : e.key;

        switch (_case) {
            case LEFT: case RIGHT:
                const left = e.key === LEFT;
                const col = selectedCell.col;

                if (left ? !col : col === ncols - 1) {
                    return;
                };

                cell = { ...selectedCell, col: col + (left ? -1 : 1) };
                scrollIntoView(cell);
                break;
            case GOTO_PARENT: case 'Backspace': {
                const key = parentKey(selectedCell.key);

                if (key) {
                    cell = { ...selectedCell, key };
                    scrollIntoView(cell);
                }

                break;
            }
            case UP:
            case DOWN:
                const up = e.key === UP;
                const keys = _.keys(meta);
                let key = selectedCell.key;

                if (e.altKey) {
                    // go to sibling
                    const i = _.last(key) + (up ? -1 : 1);
                    key = [...parentKey(key), i];

                    if (_.get(meta, str(key))) {
                        cell = { ...selectedCell, key };
                        scrollIntoView(cell);
                    }
                } else {
                    key = str(key);

                    do {
                        if (key === (up ? _.first(keys) : _.last(keys))) {
                            return;
                        }

                        let i = _.indexOf(keys, key);
                        key = keys[i + (up ? -1 : 1)];
                    } while (!nodeVisible(key, meta));

                    cell = { ...selectedCell, key: splitKey(key) };

                    if (cell.key.length > 1) {
                        scrollIntoView(cell);
                    }
                }
                break;
            default: break;
        }

        if (cell) {
            setSelectedCell(cell);
            l.keydown = true;
        }
    }, [l, meta, ncols, scrollIntoView, selectedCell, setSelectedCell]);

    useEffect(() => {
        if (!_.isEmpty(meta) && !nodeVisible(selectedCell.key, meta)) {
            onNavigate({ key: UP });
        }
    }, [meta, onNavigate, selectedCell.key]);

    if (_.isEmpty(meta)) {
        return null;
    }

    const onKeyDown = (e) => {
        if (editing) {
            if (e.key === 'Enter') {
                acceptChange();
            } else if (e.key === 'Escape') {
                endEdit();
            }

            return;
        }

        if ('0123456789'.includes(e.key)) {
            if (editing) {
                return;
            }

            let level = +e.key;

            if (level === 1 && meta['1'].folded) {
                level = 0;
            }

            _.each(_.keys(meta), key => {
                const mob = meta[key];
                mob.folded = level && split(key).length >= level;
            });

            setMeta({ ...meta });

            const folded = !getBox(br).height;
            const pos = br.scrollLeft;

            _.delay(() => {
                if (folded) {
                    level !== 1 && syncScroll(BOTTOM_RIGHT, tr.scrollLeft);
                } else {
                    level === 1 && syncScroll(TOP_RIGHT, pos);
                }
            });

            forceUpdate();
            return;
        };

        switch (e.key) {
            case 'F2': case ' ': case 'Enter':
                onEdit();
                return;
            case 'Delete':
                if (isCellEditable(selectedCell)) {
                    acceptChange(true);
                    forceUpdate();
                }
                return;
            case 'Home': case 'End':
                const home = e.key === 'Home';
                const cell = { ...selectedCell, col: home ? 0 : ncols - 1 };

                if (e.ctrlKey) {
                    const key = home ? '1' : _.findLastKey(meta, (mob, key) => nodeVisible(key, meta));
                    cell.key = split(key);
                }

                scrollIntoView(cell);
                setSelectedCell(cell);
                return;
            case LEFT: case RIGHT: case UP: case DOWN: case 'Backspace':
                if (editing) {
                    return;
                }

                if (e.altKey) {
                    if (e.key === LEFT || e.key === RIGHT) {    // (un)fold node
                        if (e.ctrlKey) {
                            const folded = e.key === LEFT;

                            if (e.shiftKey) {
                                const fold = (key) => {
                                    const mob = meta[key];
                                    mob.folded = folded;
                                    _.each(mob.node.children, node => fold(node.key));
                                };

                                fold(selectedCell.key);
                            } else {
                                meta[selectedCell.key].folded = folded;
                            }

                            setMeta({ ...meta });
                            forceUpdate();
                        }

                        return;
                    }
                } else if (e.ctrlKey) {
                    // scroll
                    const dx = e.key === LEFT ? -CELL_SIZE : e.key === RIGHT ? CELL_SIZE : 0;
                    const dy = e.key === UP ? -ROW_SIZE : e.key === DOWN ? ROW_SIZE : 0;
                    br.scrollBy(dx, dy);

                    return;
                }

                onNavigate(e);
                return;
            default: break;
        }
    };

    const onScroll = e => {
        forceUpdate();

        const ob = e.target;

        if ((ob.scrollLeft !== tr.scrollLeft)) {
            syncScroll(TOP_RIGHT, ob.scrollLeft);
        }

        if ((ob.scrollLeft !== gh.scrollLeft)) {
            syncScroll('gh', ob.scrollLeft);
        }

        if (br.scrollTop !== bl.scrollTop) {
            syncScroll(BOTTOM_LEFT, ob.scrollTop, false);
        }
    };

    const onEdit = () => {
        if (readOnly || editing) {
            return;
        }

        if (!isCellEditable || isCellEditable(selectedCell)) {
            setEditing(true);

            const value = meta[selectedCell.key].node.item[selectedCell.col];

            _.delay(() => {
                l.inputBox.value = value;
                l.inputBox.focus();
                l.inputBox.select();
            });
        };
    };

    const acceptChange = (clear) => {
        endEdit();

        const value = clear ? 0 : l.inputBox.value;

        if (onAcceptChange) {
            onAcceptChange(selectedCell, value);
        } else if (value !== '') {
            const node = meta[selectedCell.key].node;
            node.item[selectedCell.col] = +value;
        }
    };

    const endEdit = () => {
        setEditing(false);
        _.delay(() => l.view.focus());
    };

    const onToggleFold = (level, folded) => {
        if (level === 1) {
            const pos = br.scrollLeft;

            _.delay(() => {
                if (folded) {
                    tr.scrollTo(pos, 0);
                } else {
                    syncScroll(BOTTOM_RIGHT, tr.scrollLeft);
                }
            });
        }

        forceUpdate();
    };

    const onAddNode = (item, pos) => {
        const new_node = createNode ? createNode(item) : { item: [item] };

        let key = [...selectedCell.key];

        switch (pos) {
            case 'child': {
                const node = meta[key].node;
                key = [...key, node.children.length + 1];
                node.children.push(new_node);
                meta[node.key].folded = false;
                break;
            }
            case 'above': case 'below': {
                const pkey = parentKey(key);
                const above = pos === 'above';
                const off = above ? 1 : 0;
                const node = meta[pkey].node;
                node.children.splice(_.last(key) - off, 0, new_node);
                !above && (key[key.length - 1] = _.last(key) + 1);
                break;
            }
            default: return;
        }

        setTargets({ nodes, update: true });

        _.delay(() => {
            const cell = { key, col: 0 };
            scrollIntoView(cell);
            setSelectedCell(cell);

        });
    };

    const onDeleteNode = node => {
        const pkey = parentKey(node.key);
        const pnode = meta[pkey].node;
        const i = _.last(node.key) - 1;
        pnode.children.splice(i, 1);

        onNavigate({ key: UP });
        setTargets({ nodes, update: true });
    };

    const renderHeaders = () => {
        const renderHeaderCell = ({ sectionIndex, name, col }) => {
            const gridCol = sectionIndex * columnHeaders.length + col + 1;
            const style = { gridArea: `2/${gridCol}`, width: `${CELL_SIZE}px` };

            if (gridCol === selectedCell.col) {
                style.color = GOLD;
            }

            return <div key={sectionIndex * 100 + col} className='higrid-cell higrid-header-cell' style={style}>
                <div className='ellipsis'
                    onMouseEnter={(e) => tooltip.show({ e, text: name, dx: -5, dy: 25 })}
                    onMouseLeave={tooltip.hide}>{name}
                </div>
            </div>;
        };

        return <>
            {_.map(sectionHeaders, (name, i) => {
                const col = i * columnHeaders.length + 1;
                const span = columnHeaders.length;

                return <Fragment key={i}>
                    <div key={i} className='higrid-cell higrid-header-cell' style={{ gridArea: `1/${col}/auto/span ${span}` }}>
                        {name}
                    </div>
                    {_.map(columnHeaders, (name, col) => renderHeaderCell({ sectionIndex: i, name, col }))}
                </Fragment>;
            })}
        </>;
    };

    const renderCell = (node, col, value) => {
        const cell = { key: node.key, col };
        const editable = isCellEditable && isCellEditable(cell);
        const gridArea = `1/${col + 1}`;
        const level = node.key.length;
        const indent = level * LEVEL_INDENT;
        const cx = col ? CELL_SIZE : (300 - indent);
        const selectedRow = same(node.key, selectedCell.key);

        const renderInput = () => {
            const onBlur = () => editing && acceptChange();

            const background = lite ? '#F0EAD6' : APP_BACKGROUND;
            const color = lite ? APP_BACKGROUND : OFF_WHITE;

            return <input className='cell-input' ref={e => (l.inputBox = e)} type="number" onBlur={onBlur}
                style={{ gridArea, width: `${cx - 1}px`, background, color }} />;
        };

        const renderSelectedBorder = () => {
            const selected = selectedRow && col === selectedCell.col;

            if (!selected) {
                return null;
            }

            const selectedBorderColor = lite ? (editable ? 'darkmagenta' : 'darkgreen') : (editable ? LAVENDER : GOLD);
            const border = `2px solid ${selectedBorderColor}`;
            const pointerEvents = editing ? 'none' : 'auto';

            return <div style={{ gridArea, width: `${cx - 1}px`, marginLeft: '1px', border, pointerEvents }} onClick={onEdit} />;
        };

        const onClickCell = () => {
            editing && acceptChange();
            cell.col > 0 && scrollIntoView(cell);
            setSelectedCell(cell);
        };

        const id = cellId(node.key, col);
        const justifyContent = col ? 'end' : 'start';
        const width = `${cx}px`;
        const hasSectionBorder = (col % columnHeaders.length === 1);
        const borderLeftWidth = hasSectionBorder ? '3px' : !!col ? '1px' : 0;
        const borderRightWidth = !col && tr?.scrollLeft ? '3px' : 0;
        const borderLeftColor = hasSectionBorder ? APP_BACKGROUND : OFF_BACKGROUND;
        const cellStyle = getCellStyle ? getCellStyle(node, col) : {};
        const style = { gridArea, width, justifyContent, borderLeftWidth, borderRightWidth, borderLeftColor, ...cellStyle };

        if (!col && selectedRow) {
            if (lite) {
                style.fontFamily = 'Roboto Bold';
            } else {
                style.color = GOLD;
            }
        }

        const rowMarkerStyle = {
            gridArea, placeSelf: 'center start', transform: `translateX(${4 - indent}px)`,
            color: lite ? APP_BACKGROUND : GOLD
        };

        return <Fragment key={col}>
            <div id={id} className='higrid-cell' style={style} onClick={onClickCell}>
                <div className='ellipsis'>{col ? formatNumeric(value) : value}</div>
            </div>
            {editing && same(cell, selectedCell) && renderInput()}
            {renderSelectedBorder()}
            {!col && selectedRow && level > 1 && <div style={rowMarkerStyle}>●</div>}
        </Fragment>;

    };

    const renderNode = ({ node, part }) => {
        const values = node.item;
        let min = 0;
        let max = values.length - 1;

        switch (part) {
            case TOP_LEFT:
                max = 0;
                break;
            case TOP_RIGHT:
                min = 1;
                break;
            case BOTTOM_LEFT:
                max = 0;
                break;
            case BOTTOM_RIGHT:
                min = 1;
                break;
            default:
                break;
        }

        return <div className='higrid-row'>
            {_.map(values, (value, col) => col >= min && col <= max && renderCell(node, col, value))}
        </div>;
    };

    const { x: wx } = windowSize();
    const classes = `${lite ? 'higrid-view-lite' : ''}`;
    const color = lite ? APP_BACKGROUND : null;
    const overflow = `${br && !hasScrollbar(BOTTOM_RIGHT, true) ? 'auto' : 'hidden'}`;
    const headerGrid = `auto auto / repeat(${ncols - 1}, ${CELL_SIZE})`;
    const shades = palette.levels;
    const maxWidthBr = `${wx - 334}px`;
    const maxHeightBl = `${br?.clientHeight}px`;
    const trw = br?.clientHeight ? br?.clientWidth : 0;
    const maxWidthTr = trw ? `${trw}px` : 'initial';
    const maxWidthHeaders = trw ? `${trw - 1}px` : `${tr?.clientWidth - 1}px`;

    return (
        <div style={{ display: 'grid', overflow: 'hidden' }} onClick={() => l.view.focus()}>
            <div id='higrid-view' ref={e => l.view = e} className='higrid-view' tabIndex={0} onKeyDown={onKeyDown}>
                <HiGridToolbar style={{ placeSelf: 'center' }} onAddNode={onAddNode}
                    onDeleteNode={onDeleteNode} canSave={canSave} onSave={onSave} />
                <div id='gh' ref={gh_ref} className='higrid-headers'
                    style={{ gridArea: '1/2', grid: headerGrid, maxWidth: maxWidthHeaders }}>
                    {renderHeaders()}
                </div>
                <div id={TOP_LEFT} className={classes} style={{ gridArea: '2/1' }}>
                    <Foldable node={{ children: [nodes[0]], maxLevel: 1 }} atom={metaAtom}
                        shades={alert ? [(lite ? '#FFA07A' : '#B63715')] : shades} color={color}
                        onToggleFold={onToggleFold} render={node => renderNode({ node, part: TOP_LEFT })}
                    />
                </div>
                <div id={TOP_RIGHT} ref={tr_ref} className={`${classes} root-scroll`} onScroll={onScroll}
                    style={{ gridArea: '2/2', maxWidth: maxWidthTr, overflow }}>
                    <Foldable node={{ children: [nodes[0]], maxLevel: 1 }} atom={metaAtom} shades={shades} flat color={color}
                        render={node => renderNode({ node, part: TOP_RIGHT })}
                    />
                </div>
                <div id={BOTTOM_LEFT} className={classes} ref={bl_ref} style={{ gridArea: '3/1', maxHeight: maxHeightBl }}
                    onWheel={e => br?.scrollBy(0, e.deltaY)}>
                    <Foldable node={{ children: nodes[0].children }} atom={metaAtom} shades={shades} onToggleFold={onToggleFold}
                        color={color} render={node => renderNode({ node, part: BOTTOM_LEFT })}
                    />
                </div>
                <div id={BOTTOM_RIGHT} ref={br_ref} className={`${classes} root-scroll`} onScroll={onScroll}
                    style={{ gridArea: '3/2', maxWidth: maxWidthBr }} >
                    <Foldable node={{ children: nodes[0].children }} atom={metaAtom} shades={shades} flat color={color}
                        render={node => renderNode({ node, part: BOTTOM_RIGHT })} />
                </div>
            </div>
        </div>
    );
};

export default HiGrid;
