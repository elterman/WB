import dayjs from 'dayjs';
import { NBSP, BULLET } from './const';
import _ from 'lodash';

export const windowSize = () => {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;

    return { x, y };
};

export const syncScroll = (id, pos, horz = true) => {
    let ob = document.getElementById(id);
    ob?.scrollTo(horz ? pos : 0, horz ? 0 : pos);
};

export const hasScrollbar = (id, horz) => {
    let ob = document.getElementById(id);
    return horz ? ob?.clientWidth < ob?.scrollWidth : ob?.clientHeight < ob?.scrollHeight;
};

export const nbsp = (n = 1) => `${NBSP}`.repeat(n);
export const bullet = `${nbsp(2)}•${nbsp(2)}`;

export const lastWeekday = (date = null) => {
    if (date === null) {
        date = dayjs().subtract(1, 'days');
    }

    let day = date.day();

    while (day === 0 || day === 6) {
        date = date.subtract(1, 'days');
        day = date.day();
    }

    return date;
};

export const lastDayOfMonth = date => date.substring(0, 8) + dayjs(date).daysInMonth();

export const firstDayOfPrevMonth = (formatted = false) => {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), 0);
    date = dayjs(date);
    date = dayjs([date.year(), date.month() + 1, 1]);
    let day = date.day();

    while (day === 0 || day === 6) {
        date = date.add(1, 'days');
        day = date.day();
    }

    if (formatted) {
        date = date.format('YYYY-MM-DD');
    }

    return date;
};

export const lastDayOfPrevMonth = (formatted = false) => {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), 0);
    date = dayjs(date);
    date = lastWeekday(date);

    if (formatted) {
        date = date.format('YYYY-MM-DD');
    }

    return date;
};

export const formatLongDate = (year, month, day) =>
    dayjs(`${year}-${month}-${day ? day : 1}`, 'YYYY-MM-DD').format(`MMMM${day ? ' D,' : ''} YYYY`);

export const handleModalClick = (e, callback) => {
    if (typeof e.target.className === 'string' && e.target.className.includes('modal-screen')) {
        callback && callback();

        setTimeout(() => {
            const ob = document.elementFromPoint(e.clientX, e.clientY);

            ob.focus();

            ob.dispatchEvent(
                new MouseEvent(e.button ? 'mousedown' : 'click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    button: e.button,
                })
            );
        }, 200);
    }
};

export const textWidth = (text, font = null) => {
    const canvas = document.getElementById('canvas');
    const context = canvas?.getContext('2d');

    if (!context) {
        return 0;
    }

    context.font = font || '14px Roboto';
    const tm = context.measureText(text);

    return tm.width;
};

export const doFetch = (props) => {
    const { uri = null, endpoint, resolve, method = 'GET', text = false } = props;
    const url = (uri || window.apiConfig.resourceUri) + endpoint;
    const init = { method, 'Content-Type': 'application/json' };

    fetch(url, init)
        .then((res) => {
            return res.ok ? (text ? res.text() : res.json()) : Promise.reject({ status: res.status, message: res.statusText });
        })
        .then((data) => {
            resolve({ ok: true, data });
        })
        .catch((err) => {
            resolve({ ok: false, data: { ErrorMessage: err.message } });
        });
};

export const getBox = id => {
    const ob = _.isObject(id) ? id : document.getElementById(id);
    return ob?.getBoundingClientRect();

};

export const split = key => _.map(key.split(','), d => +d);

export const splitKey = key => _.isString(key) ? split(key) : key;

export const parentKey = key => {
    key = splitKey(key);

    if (key.length < 2) {
        return null;
    }

    key = _.slice(key, 0, key.length - 1);
    return key;
};

export const nodeVisible = (key, meta) => {
    key = splitKey(key);

    if (key.length < 2) {
        return true;
    }

    const pkey = parentKey(key);

    if (meta[pkey]?.collapsed) {
        return false;
    }

    return nodeVisible(pkey, meta);
};

export const cellId = (key, col) => `${key}${BULLET}${col}`;

export const cellBox = cell => getBox(cellId(cell.key, cell.col));
