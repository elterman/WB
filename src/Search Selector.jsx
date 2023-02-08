import { useEffect, useCallback, useState, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { a_date_picker_visible, a_dropdown, refilter_search, a_search_selector_filter } from './atoms';
import SearchPanel from './SearchPanel';
import _ from 'lodash';

const SearchSelector = (props) => {
    const { id, allItems, onSelectItem, renderItem, renderHeader, searchMatch, clear = false, style, offset = 0 } = props;
    const [filteredItems, setFilteredItems] = useState([]);
    const setDropdown = useSetAtom(a_dropdown);
    const hideDatePicker = useResetAtom(a_date_picker_visible);
    const [filter, setFilter] = useAtom(a_search_selector_filter);
    const [refilter, setRefilter] = useAtom(refilter_search);
    const l = useRef({}).current;
    l.clear = clear;

    const itemHeight = 27;
    const itemsPerPage = 18;
    const spid = `${id}-search-panel`;

    const updateDropdown = useCallback((items, hi = -1) => {
        const ob = document.getElementById(spid);
        const r = ob?.getBoundingClientRect();

        const dd = {
            id,
            open: true,
            x: r?.left - 1,
            y: r?.bottom + 4 + offset,
            style: { maxHeight: itemsPerPage * itemHeight },
            keepFocus: hi >= 0,
            items,
            hindex: hi,
            renderItem,
            renderHeader,
            onSelected: ({ item, event }) => {
                onSelectItem(item);
                l.clear = true;
            },
        };

        hideDatePicker();
        setDropdown(dd);
        l.clear = false;
    }, [hideDatePicker, id, l, offset, onSelectItem, renderHeader, renderItem, setDropdown, spid]);

    const onSearch = useCallback((text) => {
        const minChars = 1;

        if (text.length < minChars) {
            setDropdown({});
            return;
        }

        setFilter(text);

        const items = _.filter(allItems, item => searchMatch(item, text));

        setFilteredItems(items);
        updateDropdown(items);
    }, [allItems, searchMatch, setDropdown, setFilter, updateDropdown]);

    useEffect(() => {
        if (refilter === id) {
            setRefilter(null);
            onSearch(filter);
        }
    }, [filter, refilter, onSearch, setRefilter, id]);

    const onUpDown = (key) => {
        filteredItems.length && updateDropdown(filteredItems, key === 'ArrowUp' ? filteredItems.length - 1 : 0);
    };

    return (
        <SearchPanel id={spid} style={{ ...style }} height={28} placeholder='search (space for all)' clear={l.clear}
            onSubmit={() => { }}
            onChange={onSearch}
            onUpDown={onUpDown}
        />
    );
};

export default SearchSelector;
