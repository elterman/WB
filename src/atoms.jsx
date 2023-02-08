import { atom } from 'jotai';
import { atomWithReset, freezeAtomCreator } from 'jotai/utils';
import _ from 'lodash';
import { BENCHMARKS, COMPARE, PALETTE, PALETTES, TARGETS } from './const';
import { MOCK_NUMBERS } from './Mock Data';
import { lastDayOfPrevMonth, lastWeekday } from './utils';

export const defaultDate = (monthly = false) => (monthly ? lastDayOfPrevMonth() : lastWeekday()).format('YYYY-MM-DD');

const _freeze = freezeAtomCreator(atomWithReset);
const _atom = (init) => atomWithReset(init);
const _fatom = (init) => _freeze(init);

export const a_auth = _fatom({});
export const a_tooltip = _fatom({});
export const a_dropdown = _fatom({});
export const a_toast = _fatom(null);
export const a_date_picker_visible = _atom(false);
export const a_search_selector_filter = _atom('');
export const a_selected_tab = _atom(TARGETS);
export const a_loading = _atom(false);
export const a_funds = _fatom(null);
export const a_families = _fatom(null);

const loadPalette = () => {
    const keys = _.keys(PALETTES);
    const key = localStorage.getItem(PALETTE);

    return keys.includes(key) ? key : keys[0];

};

const a_palette_base = atom(loadPalette());

export const a_palette = atom(
    get => get(a_palette_base),

    (get, set, pkey) => {
        set(a_palette_base, pkey);
        localStorage.setItem(PALETTE, pkey);
    }
);

export const a_lite = atom(get => {
    const p = get(a_palette);
    return p.includes('-lite');
});

const a_targets_date = _atom(defaultDate());
const a_targets_fname = _atom(null);
export const a_targets_input = atom(
    get => ({ date: get(a_targets_date), fname: get(a_targets_fname) }),
    (get, set, { date, fname }) => {
        set(a_targets_date, date);
        set(a_targets_fname, fname);
    }
);

const a_compare_date1 = _atom(defaultDate());
const a_compare_fname1 = _atom(null);
const a_compare_date2 = _atom(defaultDate());
const a_compare_fname2 = _atom(null);
export const a_compare_input = atom(
    get => ({
        date1: get(a_compare_date1), fname1: get(a_compare_fname1),
        date2: get(a_compare_date2), fname2: get(a_compare_fname2),
    }),
    (get, set, { date1, fname1, date2, fname2 }) => {
        set(a_compare_date1, date1);
        set(a_compare_fname1, fname1);
        set(a_compare_date2, date2);
        set(a_compare_fname2, fname2);
    }
);

export const a_input = atom(
    get => {
        const tab = get(a_selected_tab);
        const targetsInput = get(a_targets_input);
        const compareInput = get(a_compare_input);

        let date1, fname1, date2, fname2;

        if (tab === TARGETS || tab === BENCHMARKS) {
            date1 = targetsInput.date;
            fname1 = targetsInput.fname;
        }
        else if (tab === COMPARE) {
            date1 = compareInput.date1;
            fname1 = compareInput.fname1;
            date2 = compareInput.date2;
            fname2 = compareInput.fname2;
        }

        return { date1, fname1, date2, fname2 };
    }
);

const a_targets_nodes = _fatom(null);
const a_compare_nodes = _fatom(null);
const a_benchmarks_nodes = _fatom(null);

export const a_targets_meta = _fatom(null);
export const a_compare_meta = _fatom(null);
export const a_benchmarks_meta = _fatom(null);

const sheetAtoms = atom => {
    let natom, matom;

    switch (atom) {
        case a_targets:
            natom = a_targets_nodes;
            matom = a_targets_meta;
            break;
        case a_compare:
            natom = a_compare_nodes;
            matom = a_compare_meta;
            break;
        case a_benchmarks:
            natom = a_benchmarks_nodes;
            matom = a_benchmarks_meta;
            break;
        default: break;
    }

    return { natom, matom };
};

const getSheetData = ({ atom, get }) => {
    const { natom, matom } = sheetAtoms(atom);

    return { nodes: get(natom), meta: get(matom), metaAtom: matom };
};

const setSheetData = ({ atom, set, nodes }) => {
    const { natom, matom } = sheetAtoms(atom);
    const meta = {};

    const processNodes = (nodes, parentKey) => {
        if (!parentKey) {
            parentKey = [];
        }

        _.each(nodes, (node, i) => {
            node.key = [...parentKey, i + 1];
            meta[node.key] = { collapsed: false, node };
            processNodes(node.children, node.key);
        });
    };

    processNodes(nodes);

    // MOCK ///////////////////////////////////////////////////
    _.each(_.keys(meta), (key, i) => {
        const mob = meta[key];
        mob.node.item = [mob.node.item[0], ...MOCK_NUMBERS[i]];
    });
    ///////////////////////////////////////////////////////////

    set(natom, nodes);
    set(matom, meta);
};

export const a_targets = atom(
    get => getSheetData({ atom: a_targets, get }),
    (get, set, nodes) => setSheetData({ atom: a_targets, set, nodes })
);

export const a_compare = atom(
    get => getSheetData({ atom: a_compare, get }),
    (get, set, nodes) => setSheetData({ atom: a_compare, set, nodes })
);

export const a_benchmarks = atom(
    get => getSheetData({ atom: a_benchmarks, get }),
    (get, set, nodes) => setSheetData({ atom: a_benchmarks, set, nodes })
);

export const a_has_targets = atom(get => !_.isEmpty(get(a_targets_nodes)));
export const a_has_compare = atom(get => !_.isEmpty(get(a_compare_nodes)));
export const a_has_benchmarks = atom(get => !_.isEmpty(get(a_benchmarks_nodes)));

export const a_selected_family = atom(
    get => {
        const families = get(a_families);
        const { fname } = get(a_targets_input);
        const fob = families[fname];

        return { fname, members: fob?.members };
    }
);

const firstCell = { key: [1, 1, 1, 2], col: 2 };
const a_targets_selected_cell = _fatom(firstCell);
const a_compare_selected_cell = _fatom(firstCell);
const a_benchmarks_selected_cell = _fatom(firstCell);

export const a_selected_cell = atom(
    get => {
        const tab = get(a_selected_tab);

        switch (tab) {
            case TARGETS: return get(a_targets_selected_cell);
            case COMPARE: return get(a_compare_selected_cell);
            case BENCHMARKS: return get(a_benchmarks_selected_cell);
            default: return firstCell;
        }
    },
    (get, set, cell) => {
        const tab = get(a_selected_tab);

        switch (tab) {
            case TARGETS: return set(a_targets_selected_cell, cell);
            case COMPARE: return set(a_compare_selected_cell, cell);
            case BENCHMARKS: return set(a_benchmarks_selected_cell, cell);
            default: return firstCell;
        }
    }
);