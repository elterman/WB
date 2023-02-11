import { useState } from 'react';
import { formatLongDate } from './utils';
import Button from './Button';
import SvgCalendar from './Icons/Svg Calendar';
import { a_date_picker_visible } from './atoms';
import { useSetAtom } from 'jotai';
import { GREEN } from './const';

const DateButton = (props) => {
    const { monthly, date, style, onClick, disabled, placeholder, tip , color = GREEN} = props;
    const id = props.id || 'btn-date-picker';
    const setPickerVisible = useSetAtom(a_date_picker_visible);
    const [focused, setFocused] = useState(false);
    const borderColor = focused ? '#fff8' : 'transparent';

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick && onClick(id);
            setTimeout(() => setPickerVisible(true));
        }
    };

    return (
        <div tabIndex={0} style={{ borderColor }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onKeyDown={handleKeyDown}>
            <Button id={id} style={{ ...style }} disabled={disabled}
                label={date ? formatLongDate(date.slice(0, 4), date.slice(5, 7), monthly ? 0 : date.slice(8)) : placeholder}
                tip={tip} tipoff={{ x: 210, y: -5 }} onClick={() => {
                    onClick && onClick(id);
                    setPickerVisible(true);
                }}>
                <SvgCalendar width={18} checkmark={date} disabled={disabled} color={color}/>
            </Button>
        </div>
    );
};

export default DateButton;
