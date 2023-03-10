import { useEffect, useState } from 'react';
import './Date Picker.css';
import _ from 'lodash';
import SvgAngle from './Icons/Svg Angle';
import { formatLongDate } from './utils';
import dayjs from 'dayjs';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DatePicker = (props) => {
    const { year, month, day, monthly, canNoDate, noDateLabel, style, onExit } = props;
    const { futureEnabled, weekendsEnabled } = props;

    const getWeekOfMonth = (date) => {
        var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var offsetDate = date.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7);
    };

    const maxDate = dayjs().subtract(1, 'day');
    const cutoffDate = maxDate;
    const cutoffYear = cutoffDate.year();
    const cutoffMonth = cutoffDate.month() + 1;
    const cutoffDay = cutoffDate.date();

    const isFutureDate = (y, m, d) => {
        const future = y > cutoffYear || (y === cutoffYear && m > cutoffMonth) ||
            (y === cutoffYear && m === cutoffMonth && d > cutoffDay);

        return future;
    };

    const isFutureMonth = (y, m) => {
        const future = selectedYear > cutoffYear || (selectedYear === cutoffYear && m > cutoffMonth);
        return future;
    };

    const [selectedDay, selectDay] = useState(Number(day) || cutoffDay);
    const [selectedMonth, selectMonth] = useState(Number(month) || cutoffMonth);
    const [selectedYear, selectYear] = useState(Number(year) || cutoffYear);
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const futureSelected = isFutureDate(selectedYear, selectedMonth, selectedDay);
    const canSelect = !futureSelected || futureEnabled;

    useEffect(() => {
        (selectedDay > daysInMonth) && selectDay(daysInMonth);
    }, [selectedYear, selectedMonth, selectedDay, daysInMonth]);

    return (
        <div className="mp" style={style}>
            <div className="mp-header">
                <div className={`mp-long-date${futureSelected ? ' mp-future' : ''}`}>
                    {formatLongDate(selectedYear, selectedMonth, monthly ? 0 : selectedDay)}
                </div>
                <div className="mp-year-selector">
                    <div style={{ gridArea: '1/1', transform: 'rotate(180deg)', marginRight: '3px' }}
                        onClick={() => selectYear(selectedYear - 5)}>
                        <SvgAngle width={14} />
                    </div>
                    {_.map([-2, -1, 0, 1, 2], (off) => {
                        const future = selectedYear + off > cutoffYear;
                        const disabled = future && !futureEnabled;

                        let classes = 'mp-year';

                        if (disabled) {
                            classes += ' mp-item-disabled';
                        } else {
                            classes += `${off ? '' : ' mp-year-selected'}${future ? ' mp-future' : ''}`;
                        }

                        return <div key={off} className={classes} onClick={() => !disabled && selectYear(selectedYear + off)}>
                            {selectedYear + off}
                        </div>;
                    })}
                    <div style={{ gridArea: '1/7', marginLeft: '3px' }} onClick={() => selectYear(selectedYear + 5)}>
                        <SvgAngle width={14} />
                    </div>
                </div>
            </div>
            <div className="mp-month-selector">
                {_.map(MONTHS, (m, i) => {
                    const selected = i === selectedMonth - 1;
                    const future = isFutureMonth(selectedYear, i + 1);
                    const disabled = future && !futureEnabled;
                    const row = Math.floor(i / 4) + 1;
                    const col = (i % 4) + 1;
                    const gridArea = `${row}/${col}`;

                    let classes = 'mp-month mp-item';

                    if (disabled) {
                        classes += ' mp-item-disabled';
                    } else {
                        classes += `${selected ? ' mp-item-selected' : ''}${future ? ' mp-future' : ''}`;
                    }

                    return (
                        <div key={i} className={classes} style={{ gridArea }} onClick={() => {
                            if (disabled) {
                                return;
                            }

                            selectMonth(i + 1);

                            if (monthly) {
                                const day = dayjs(new Date(selectedYear, i, 1)).daysInMonth();
                                i + 1 !== selectedMonth && !disabled && onExit(i + 1, selectedYear, day);
                            }
                        }}>{m}</div>
                    );
                })}
            </div>
            {!monthly && <div className="mp-day-selector">
                <>
                    {_.map(DOW, (d, i) => {
                        return (
                            <div key={i} className="mp-dow" style={{ gridArea: `1/${i + 1}` }}>
                                {d}
                            </div>
                        );
                    })}
                    {_.map(_.range(1, 32), (d, i) => {
                        if (i + 1 > daysInMonth) {
                            return null;
                        }

                        const selected = i === selectedDay - 1;
                        const date = new Date(selectedYear, selectedMonth - 1, i + 1);
                        const day = date.getDay();
                        const weekend = day === 0 || day === 6;
                        const future = isFutureDate(selectedYear, selectedMonth, i + 1);
                        const disabled = (future && !futureEnabled) || (weekend && !weekendsEnabled);

                        let classes = 'mp-day mp-item';

                        if (disabled) {
                            classes += ' mp-item-disabled';
                        } else if (selected) {
                            classes += ' mp-item-selected';
                        } else if (future) {
                            classes += weekend ? ' mp-future-weekend' : ' mp-future';
                        } else if (weekend) {
                            classes += ' mp-weekend';
                        }

                        const col = day + 1;
                        const row = getWeekOfMonth(date) + 2;
                        const gridArea = `${row}/${col}`;
                        const ok = i + 1 !== selectedDay && !disabled;

                        return (
                            <div key={i} className={classes} style={{ gridArea }}
                                onClick={() => ok && onExit(selectedMonth, selectedYear, i + 1)}>
                                {d}
                            </div>
                        );
                    })}
                </>
            </div>}
            <div className="mp-buttons">
                <div className={`${canNoDate ? 'mp-button' : ''}`} onClick={() => canNoDate && onExit(null, null, null)}>
                    {canNoDate ? noDateLabel || 'No Date' : null}
                </div>
                <div className={`mp-button ${canSelect ? '' : 'mp-button-disabled'}`}
                    onClick={() => canSelect && onExit(selectedMonth, selectedYear, selectedDay)}>
                    OK
                </div>
                <div
                    className="mp-button"
                    onClick={() => onExit(null, null, null, true)}>
                    Cancel
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
