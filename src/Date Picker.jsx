import { useEffect, useState } from 'react';
import './Date Picker.css';
import _ from 'lodash';
import SvgAngle from './Icons/Svg Angle';
import { formatLongDate } from './utils';
import dayjs from 'dayjs';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const getWeekOfMonth = (date) => {
    var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    var offsetDate = date.getDate() + firstWeekday - 1;
    return Math.floor(offsetDate / 7);
};

const isFutureDate = (y, m, d) => {
    const today = dayjs();

    const cutoffDate = today;
    const todayYear = cutoffDate.year();
    const todayMonth = cutoffDate.month() + 1;
    const todayDay = cutoffDate.date();
    const future = y > todayYear || (y === todayYear && m > todayMonth) || (y === todayYear && m === todayMonth && d > todayDay);
    return future;
};

const DatePicker = (props) => {
    const { year, month, day, monthly, canNoDate, noDateLabel, weekendsEnabled = false, style, onExit } = props;
    const cutoffDate = dayjs();
    const todayYear = cutoffDate.year();
    const todayMonth = cutoffDate.month() + 1;
    const todayDay = cutoffDate.date();
    const [selectedDay, selectDay] = useState(Number(day) || todayDay);
    const [selectedMonth, selectMonth] = useState(Number(month) || todayMonth);
    const [selectedYear, selectYear] = useState(Number(year) || todayYear);
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const futureSelected = isFutureDate(selectedYear, selectedMonth, selectedDay);

    useEffect(() => {
        if (selectedDay > daysInMonth) {
            selectDay(daysInMonth);
        }
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
                        const future = selectedYear + off > todayYear;
                        return (
                            <div
                                key={off}
                                className={`mp-year ${off ? '' : 'mp-year-selected'}${future ? ' mp-future' : ''}`}
                                onClick={() => selectYear(selectedYear + off)}>
                                {selectedYear + off}
                            </div>
                        );
                    })}
                    <div style={{ gridArea: '1/7', marginLeft: '3px' }} onClick={() => selectYear(selectedYear + 5)}>
                        <SvgAngle width={14} />
                    </div>
                </div>
            </div>
            <div className="mp-month-selector">
                {_.map(MONTHS, (m, i) => {
                    const selected = i === selectedMonth - 1;
                    const future = selectedYear > todayYear || (selectedYear === todayYear && i + 1 > todayMonth);
                    const classes = `mp-month mp-item${selected ? ' mp-item-selected' : ''}
                        ${future ? (selected ? ' mp-future' : ' mp-dark-future') : ''}`;
                    const row = Math.floor(i / 4) + 1;
                    const col = (i % 4) + 1;
                    const gridArea = `${row}/${col}`;
                    return (
                        <div key={i} className={classes} style={{ gridArea }} onClick={() => {
                            selectMonth(i + 1);

                            if (monthly) {
                                const day = dayjs(new Date(selectedYear, i, 1)).daysInMonth();
                                i + 1 !== selectedMonth && onExit(i + 1, selectedYear, day);
                            }
                        }}>
                            {m}
                        </div>
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
                        const future =
                            selectedYear > todayYear ||
                            (selectedYear === todayYear && selectedMonth > todayMonth) ||
                            (selectedYear === todayYear && selectedMonth === todayMonth && i + 1 > todayDay);
                        const date = new Date(selectedYear, selectedMonth - 1, i + 1);
                        const day = date.getDay();
                        const weekday = day > 0 && day < 6;

                        const classes = `mp-day mp-item${selected ? ' mp-item-selected' :
                            `${future ? (selected ? ' mp-future' : ' mp-dark-future') : ''}${weekday ? '' :
                                weekendsEnabled ? (future ? ' mp-weekend-enabled-future' : ' mp-weekend-enabled') : ' mp-weekend'}`}`;

                        const col = day + 1;
                        const row = getWeekOfMonth(date) + 2;
                        const gridArea = `${row}/${col}`;

                        return (
                            <div
                                key={i}
                                className={classes}
                                style={{ gridArea }}
                                onClick={() => i + 1 !== selectedDay && (weekday || weekendsEnabled) &&
                                    onExit(selectedMonth, selectedYear, i + 1)}>
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
                <div className="mp-button" onClick={() => onExit(selectedMonth, selectedYear, selectedDay)}>
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
