import { useState } from 'react';
import DatePicker from './Date Picker';
import { useSpring, animated } from 'react-spring';
import { useSetAtom } from 'jotai';
import { a_date_picker_visible } from './atoms';
import { handleModalClick } from './utils';

const DatePickerView = (props) => {
    const { bid, monthly, date, canNoDate, noDateLabel, setDate, align = 'center' } = props;
    const { futureEnabled = false, weekendsEnabled = true } = props;
    const [exit, setExit] = useState();
    const setVisible = useSetAtom(a_date_picker_visible);

    const { opacity } = useSpring({
        opacity: exit ? 0 : 1,
        from: { opacity: 0 },
        onRest: () => exit && setVisible(false),
    });

    const onExitDatePicker = (month, year, day, cancelled) => {
        if (cancelled) {
            setVisible(false);
            return;
        }

        if (month) {
            setExit(true);
        } else {
            setVisible(false);
        }

        if (month && year && day) {
            const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            setDate(date);
        } else {
            setDate(null);
        }
    };

    const r = document.getElementById(bid || 'btn-date-picker')?.getBoundingClientRect();

    if (!r) {
        return null;
    }

    const dx = 276;
    let left = r.right - dx;

    if (align === 'left') {
        left = r.left;
    } else if (align === 'center') {
        left = r.left + (r.width - dx) / 2;
    }

    return (
        <animated.div
            id="date-picker-screen"
            className="modal-screen"
            style={{ cursor: 'initial', opacity }}
            onClick={(e) => handleModalClick(e, () => setVisible(false), false)}>
            <DatePicker
                style={{ left, top: `${r?.bottom + 7}px`, opacity }}
                monthly={monthly}
                canNoDate={canNoDate}
                noDateLabel={noDateLabel}
                futureEnabled={futureEnabled}
                weekendsEnabled={weekendsEnabled}
                year={date?.slice(0, 4)}
                month={date?.slice(5, 7)}
                day={date?.slice(8)}
                onExit={onExitDatePicker}
            />
        </animated.div>
    );
};

export default DatePickerView;
