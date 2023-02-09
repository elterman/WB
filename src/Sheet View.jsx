import { useAtom, useAtomValue } from 'jotai';
import _ from 'lodash';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { a_lite, a_palette, a_selected_cell } from './atoms';
import Collapsible, { LEVEL_INDENT } from './Collapsible';
import { APP_BACKGROUND, PALETTES, GOLD, LAVENDER, OFF_BACKGROUND, OFF_WHITE } from './const';
import { useForceUpdate } from './hooks';
import { useTooltip } from './Tooltip';
import { cellBox, cellId, getBox, hasScrollbar, splitKey, nodeVisible, split, syncScroll, windowSize, formatNumeric } from './utils';

const CELL_SIZE = 70;
const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';
const BOTTOM_LEFT = 'bottom-left';
const BOTTOM_RIGHT = 'bottom-right';

const SheetView = (props) => {
    const { atom, columnHeaders, sectionHeaders, canEdit, cellEditable, getCellStyle, onAcceptChange } = props;
    const [{ nodes, metaAtom }] = useAtom(atom);
    const [meta, setMeta] = useAtom(metaAtom);
    const lite = useAtomValue(a_lite);
    const [selectedCell, setSelectedCell] = useAtom(a_selected_cell);
    const [editCell, setEditCell] = useState(null);
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
    const palette = PALETTES[paletteKey];
    const l = useRef({}).current;

    useEffect(() => {
        window.addEventListener('resize', forceUpdate);
        return () => window.removeEventListener('resize', forceUpdate);
    }, [forceUpdate]);

    useEffect(() => {
        forceUpdate();
        l.sheet?.focus();
    }, [forceUpdate, l.sheet]);

    const scrollIntoView = useCallback(cell => {
        const cbox = cellBox(cell);

        let part = br;
        let sbox = getBox(part);

        if (sbox.height) {
            if (cbox.top < sbox.top) {
                part.scrollBy(0, cbox.top - sbox.top, 0);
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

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const left = e.key === 'ArrowLeft';
            const col = selectedCell.col;

            if (left ? !col : col === ncols - 1) {
                return;
            };

            cell = { ...selectedCell, col: col + (left ? -1 : 1) };
            scrollIntoView(cell);

        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const up = e.key === 'ArrowUp';
            const keys = _.keys(meta);
            let key = selectedCell.key;

            do {
                key = `${key}`;

                if (key === (up ? _.first(keys) : _.last(keys))) {
                    return;
                }

                let i = _.indexOf(keys, key);
                key = keys[i + (up ? -1 : 1)];
            } while (!nodeVisible(key, meta));

            cell = { ...selectedCell, key: splitKey(key) };

            if (!_.isEqual(cell.key, [1])) {
                scrollIntoView(cell);
            }
        }

        if (cell) {
            setSelectedCell(cell);
            l.keydown = true;
        }
    }, [l, meta, ncols, scrollIntoView, selectedCell, setSelectedCell]);

    const onEdit = useCallback((cell) => {
        if (!cell) {
            setEditCell(null);
        } else if (cellEditable && cellEditable(cell)) {
            setEditCell(cell);
        };
    }, [cellEditable]);

    useEffect(() => {
        if (!_.isEmpty(meta) && !nodeVisible(selectedCell.key, meta)) {
            onNavigate({ key: 'ArrowUp' });
        }
    }, [meta, onNavigate, selectedCell.key]);

    if (_.isEmpty(meta)) {
        return null;
    }

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

    const onEditCell = () => {
        onEdit && onEdit(selectedCell);

        const value = meta[selectedCell.key].node.item[selectedCell.col];

        _.delay(() => {
            l.inputBox.value = value;
            l.inputBox.focus();
            l.inputBox.select();
        });
    };

    const acceptChange = (clear) => {
        l.inputBox?.blur();

        const value = clear ? 0 : l.inputBox.value;

        if (onAcceptChange) {
            onAcceptChange(selectedCell, value);
        } else if (value !== '') {
            const node = meta[selectedCell.key].node;
            node.item[selectedCell.col] = +value;
        }

        onEdit(null);
    };

    const rejectChange = () => {
        onEdit(null);
        _.delay(() => l.inputBox?.blur());
    };

    const onKeyDown = (e) => {
        if (editCell) {
            if (e.key === 'Enter') {
                acceptChange();
            } else if (e.key === 'Escape') {
                rejectChange();
            }

            return;
        }

        if (e.key === 'F2' || e.code === 'Space') {
            !editCell && onEditCell();
            return;
        }

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            !editCell && onNavigate(e);
            return;
        }

        if (e.key === 'Delete') {
            acceptChange(true);
            forceUpdate();

            return;
        }

        if ('0123456789'.includes(e.key)) {
            if (editCell) {
                return;
            }

            const level = +e.key;

            _.each(_.keys(meta), key => {
                const mob = meta[key];
                mob.collapsed = level && split(key).length >= level;
            });

            setMeta({ ...meta });

            const brCollapsed = !getBox(br).height;
            const pos = br.scrollLeft;

            _.delay(() => {
                if (brCollapsed) {
                    level !== 1 && syncScroll(BOTTOM_RIGHT, tr.scrollLeft);
                } else {
                    level === 1 && syncScroll(TOP_RIGHT, pos);
                }
            });

            forceUpdate();
        };
    };

    const onToggleCollapsed = (level, collapsed) => {
        if (level === 1) {
            const pos = br.scrollLeft;

            _.delay(() => {
                if (collapsed) {
                    tr.scrollTo(pos, 0);
                } else {
                    syncScroll(BOTTOM_RIGHT, tr.scrollLeft);
                }
            });
        }

        forceUpdate();
    };

    const renderHeaders = () => {
        const renderHeaderCell = ({ sectionIndex, name, col }) => {
            const gridCol = sectionIndex * columnHeaders.length + col + 1;

            return <div key={sectionIndex * 100 + col} className='sheet-cell sheet-header-cell'
                style={{ gridArea: `2/${gridCol}`, width: `${CELL_SIZE}px` }}>
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
                    <div key={i} className='sheet-cell sheet-header-cell' style={{ gridArea: `1/${col}/auto/span ${span}` }}>
                        {name}
                    </div>
                    {_.map(columnHeaders, (name, col) => renderHeaderCell({ sectionIndex: i, name, col }))}
                </Fragment>;
            })}
        </>;
    };

    const renderCell = (node, col, value) => {
        const cell = { key: node.key, col };
        const editable = cellEditable && cellEditable(cell);
        const gridArea = `1/${col + 1}`;
        const indent = node.key.length * LEVEL_INDENT;
        const cx = col ? CELL_SIZE : (300 - indent);

        const onClick = () => {
            editCell && acceptChange();
            cell.col > 0 && scrollIntoView(cell);
            setSelectedCell(cell);
        };

        const renderInput = () => {
            const onBlur = () => {
                editCell && acceptChange();
                l.sheet.focus();
            };

            const background = lite ? '#ECEBEB' : APP_BACKGROUND;
            const color = lite ? APP_BACKGROUND : OFF_WHITE;

            return <input className='cell-input' ref={e => (l.inputBox = e)} type="number" onBlur={onBlur}
                style={{ gridArea, width: `${cx - 1}px`, background, color }} />;
        };

        const renderSelectedBorder = () => {
            const selected = _.isEqual(node.key, selectedCell.key) && col === selectedCell.col;

            if (!selected) {
                return null;
            }

            const selectedBorderColor = lite ? (editable ? 'darkmagenta' : 'darkgreen') : (editable ? LAVENDER : GOLD);
            const border = `2px solid ${selectedBorderColor}`;
            const pointerEvents = editCell ? 'none' : 'auto';

            return <div style={{ gridArea, width: `${cx - 1}px`, marginLeft: '1px', border, pointerEvents }}
                onClick={onEditCell} />;
        };

        const justifyContent = col ? 'end' : 'start';
        const width = `${cx}px`;
        const hasSectionBorder = (col % columnHeaders.length === 1);
        const borderLeftWidth = hasSectionBorder ? '3px' : !!col ? '1px' : 0;
        const borderRightWidth = !col && tr?.scrollLeft ? '3px' : 0;
        const borderLeftColor = hasSectionBorder ? APP_BACKGROUND : OFF_BACKGROUND;
        const cellStyle = getCellStyle ? getCellStyle(node, col) : {};
        const style = { gridArea, width, justifyContent, borderLeftWidth, borderRightWidth, borderLeftColor, ...cellStyle };
        const id = cellId(node.key, col);

        value = formatNumeric(value);

        return <Fragment key={col}>
            <div id={id} className='sheet-cell' style={style} onClick={onClick}>
                <div className='ellipsis'>{value}</div>
            </div>
            {_.isEqual(cell, editCell) && renderInput()}
            {renderSelectedBorder()}
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

        return <div className='sheet-row'>
            {_.map(values, (value, col) => col >= min && col <= max && renderCell(node, col, value))}
        </div>;
    };

    const { x: wx } = windowSize();
    const classes = `${lite ? 'sheet-view-lite' : ''}`;
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
        <div id='sheet-view' ref={e => l.sheet = e} className='sheet-view' tabIndex={0} onKeyDown={onKeyDown}>
            <div id='gh' ref={gh_ref} className='sheet-headers' style={{ gridArea: '1/2', grid: headerGrid, maxWidth: maxWidthHeaders }}>
                {renderHeaders()}
            </div>
            <div id={TOP_LEFT} className={classes} style={{ gridArea: '2/1' }}>
                <Collapsible node={{ children: [nodes[0]], maxLevel: 1 }} atom={metaAtom} shades={shades} color={color}
                    onToggleCollapsed={onToggleCollapsed} render={node => renderNode({ node, part: TOP_LEFT })}
                />
            </div>
            <div id={TOP_RIGHT} ref={tr_ref} className={`${classes} root-scroll`} onScroll={onScroll}
                style={{ gridArea: '2/2', maxWidth: maxWidthTr, overflow }}>
                <Collapsible node={{ children: [nodes[0]], maxLevel: 1 }} atom={metaAtom} shades={shades} flat color={color}
                    render={node => renderNode({ node, part: TOP_RIGHT })}
                />
            </div>
            <div id={BOTTOM_LEFT} className={classes} ref={bl_ref} style={{ gridArea: '3/1', maxHeight: maxHeightBl }}
                onWheel={e => br?.scrollBy(0, e.deltaY)}>
                <Collapsible node={{ children: nodes[0].children }} atom={metaAtom} shades={shades} onToggleCollapsed={onToggleCollapsed}
                    color={color} render={node => renderNode({ node, part: BOTTOM_LEFT })}
                />
            </div>
            <div id={BOTTOM_RIGHT} ref={br_ref} className={`${classes} root-scroll`} onScroll={onScroll}
                style={{ gridArea: '3/2', maxWidth: maxWidthBr }} >
                <Collapsible node={{ children: nodes[0].children }} atom={metaAtom} shades={shades} flat color={color}
                    render={node => renderNode({ node, part: BOTTOM_RIGHT })}
                />
            </div>
        </div>
    );

};

export default SheetView;
