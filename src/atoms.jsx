import { atom } from 'jotai';
import { atomWithReset, freezeAtomCreator } from 'jotai/utils';
import _ from 'lodash';
import { APP_BACKGROUND, BENCHMARKS, COMPARE, GOLD, LAVENDER, OFF_WHITE, PALETTE, PALETTES, TARGETS, WHITE } from './const';
import { lastDayOfPrevMonth, lastWeekday, str } from './utils';

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
export const a_saving = _atom(false);
export const a_funds = _fatom(null);
export const a_families = _fatom(null);
export const a_funds_to_add = _fatom(null);

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

export const a_theme = atom(get => {
    const lite = get(a_palette).includes('-lite');;

    return {
        lite,
        alert: lite ? '#FFA07A' : '#B63715',
        change: lite ? '#ABC6DC' : '#506C85',
        input: { background: lite ? '#F0EAD6' : APP_BACKGROUND, color: lite ? APP_BACKGROUND : OFF_WHITE },
        selectedBorder: { editable: lite ? '#8A0000' : LAVENDER, readonly: lite ? 'black' : GOLD },
        rowMarker: lite ? APP_BACKGROUND : GOLD,
        toggle: lite ? APP_BACKGROUND : WHITE,
    };
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

const firstCell = { key: [1, 1], col: 1 };
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

const a_targets_nodes = _fatom(null);
const a_compare_nodes = _fatom(null);
const a_benchmarks_nodes = _fatom(null);

export const a_targets_meta = _fatom(null);
export const a_compare_meta = _fatom(null);
export const a_benchmarks_meta = _fatom(null);

const gridAtoms = (get) => {
    let natom, matom;
    const tab = get(a_selected_tab);

    switch (tab) {
        case TARGETS:
            natom = a_targets_nodes;
            matom = a_targets_meta;
            break;
        case COMPARE:
            natom = a_compare_nodes;
            matom = a_compare_meta;
            break;
        case BENCHMARKS:
            natom = a_benchmarks_nodes;
            matom = a_benchmarks_meta;
            break;
        default: return null;
    }

    return { natom, matom };
};

export const a_grid_data = atom(
    get => {
        const { natom, matom } = gridAtoms(get);
        return { nodes: get(natom), meta: get(matom), metaAtom: matom };
    },

    (get, set, payload) => {
        const { natom, matom } = gridAtoms(get);
        const { nodes, update } = payload;
        const meta = get(matom);
        const new_meta = {};

        const processNodes = (nodes, parentKey) => {
            if (!parentKey) {
                parentKey = [];
            }

            _.each(nodes, (node, i) => {
                node.key = [...parentKey, i + 1];

                const mob = update ? _.get(meta, str(node.key)) : null;
                new_meta[node.key] = { ...mob, node };
                processNodes(node.children, node.key);
            });
        };

        processNodes(nodes);

        set(natom, nodes);
        set(matom, new_meta);
        set(a_selected_cell, firstCell);
    }
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

export const a_originals = atom({ local: null, global: null });
