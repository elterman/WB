import { useState } from 'react';
import Button from './Button';
import { a_dropdown, a_date_picker_visible } from './atoms';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import _ from 'lodash';

const DropdownSelector = (props) => {
    const { id, items, selectedItem, setItem, style, offset, disabled, tip, icon } = props;
    const setDropdown = useSetAtom(a_dropdown);
    const [focused, setFocused] = useState(false);
    const borderColor = focused ? '#fff8' : 'transparent';
    const hideDatePicker = useResetAtom(a_date_picker_visible);
    const bid = `button-${id}`;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setDropdown({});
            updateDropdown();
        }
    };

    const updateDropdown = () => {
        const ob = document.getElementById(bid);
        const r = ob?.getBoundingClientRect();

        const itemHeight = 27;
        const itemsPerPage = 20;

        const dd = {
            id,
            open: true,
            x: r.left + (_.isNumber(offset) ? offset : 0),
            y: r?.bottom + 5,
            offset,
            buttonRect: r,
            style: {
                maxHeight: itemsPerPage * itemHeight,
                boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
            },
            items,
            renderItem: (type) => {
                return (
                    <div className="dd-check-item">
                        <span style={{ marginTop: '-2px' }}>{type === selectedItem ? '●' : null}</span>
                        <div>{type}</div>
                    </div>
                );
            },
            onSelected: ({ item }) => {
                setItem(item);
                setDropdown({});
            },
        };

        hideDatePicker();
        setTimeout(() => setDropdown(dd));
    };

    return (
        <div
            tabIndex={0}
            style={{ borderColor, height: '30px' }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}>
            <Button id={bid} style={{ ...style }} label={selectedItem} handleClick={updateDropdown} disabled={!!disabled} tip={tip} >
                {icon}
            </Button>
        </div>
    );
};

export default DropdownSelector;
