import { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import { useAtomValue, useAtom } from 'jotai';
import { a_dropdown } from './atoms';
import { useSpring, animated } from 'react-spring';
import { handleModalClick } from './utils';
import { DOWN, UP } from './const';

const SelectorDropdown = () => {
    const dropdown = useAtomValue(a_dropdown);
    return dropdown.open ? <Dropdown /> : null;
};

export default SelectorDropdown;

const Dropdown = () => {
    const [dropdown, setDropdown] = useAtom(a_dropdown);
    const { items, selectedItem, hindex = -1, x, y, style, keepFocus = true, renderItem, renderHeader } = dropdown;
    const { opacity } = useSpring({ opacity: 1, from: { opacity: 0 } });
    const _dd = useRef(null);
    const [highlight, setHighlight] = useState(-1);
    const [left, setLeft] = useState(x);

    const itemHeight = 27;

    useEffect(() => {
        keepFocus && _dd.current.focus();
    }, [keepFocus]);

    useEffect(() => {
        setHighlight(hindex);

        if (hindex === 0 || hindex === items.length - 1) {
            _dd.current.scroll(0, hindex ? (items.length - 1) * itemHeight : 0);
        }
    }, [hindex, items.length]);

    useEffect(() => {
        if (dropdown.offset === 'center' || dropdown.offset === 'right') {
            const r = _dd.current.getBoundingClientRect();
            const br = dropdown.buttonRect;
            const left = dropdown.offset === 'center' ? x + (br.width - r.width) / 2 : br.right - r.width;

            setLeft(left);
        }
    }, [dropdown.buttonRect, dropdown.offset, x]);

    const selectItem = (e, i) => {
        if (items[i] === selectedItem) {
            return;
        }

        dropdown.onSelected({ item: items[i], index: i, event: e });
        setDropdown({});
    };

    const handleNavigation = (key) => {
        const itemsPerPage = 20;

        let i;

        switch (key) {
            case UP:
                i = highlight > 0 ? highlight - 1 : highlight < 0 ? items.length - 1 : 0;
                break;
            case DOWN:
                i = Math.min(items.length - 1, highlight + 1);
                break;
            case 'PageUp':
                i = Math.max(0, highlight - itemsPerPage);
                break;
            case 'PageDown':
                i = Math.min(items.length - 1, highlight + itemsPerPage);
                break;
            case 'Home':
                i = 0;
                break;
            case 'End':
                i = items.length - 1;
                break;
            default:
                return;
        }

        setHighlight(i);

        const min = _dd.current.scrollTop / itemHeight;
        const max = min + itemsPerPage - 1;

        if (i < min || i > max) {
            _dd.current.scroll(0, Math.max(0, (i < min ? i : i - itemsPerPage + 1) * itemHeight));
        }
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                setDropdown({});
                break;
            case 'Enter':
                highlight >= 0 && selectItem(e, highlight);
                break;
            case UP:
            case DOWN:
            case 'PageUp':
            case 'PageDown':
            case 'Home':
            case 'End':
                e.preventDefault();
                handleNavigation(e.key);
                break;
            default:
                return;
        }
    };

    return (
        <div className="modal-screen" onMouseDown={(e) => handleModalClick(e, () => setDropdown({}))}>
            <animated.div style={{ position: 'absolute', zIndex: 2, left, top: y, display: 'grid', opacity }}>
                {renderHeader && renderHeader()}
                <div id="selector-dropdown" ref={_dd} className="dropdown root-scroll" style={{ ...style }} tabIndex={0}
                    onKeyDown={handleKeyDown}>
                    {_.map(items, (item, i) => {
                        const classes = `dd-item ${item === selectedItem ? 'dd-item-selected' : ''} ${i === highlight ? 'dd-highlight' : ''}`;
                        return (
                            <div id={`dd-item-${i}`} key={i} className={classes} onClick={(e) => selectItem(e, i)}>
                                {renderItem ? renderItem(item) : item}
                            </div>
                        );
                    })}
                </div>
            </animated.div>
        </div>
    );
};
