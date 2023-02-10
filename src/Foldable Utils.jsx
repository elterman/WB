import { BULLET } from './const';
import { getBox } from './utils';
import _ from 'lodash';

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

    if (meta[pkey]?.folded) {
        return false;
    }

    return nodeVisible(pkey, meta);
};

export const cellId = (key, col) => `${key}${BULLET}${col}`;

export const cellBox = cell => getBox(cellId(cell.key, cell.col));
