import Popup from './Popup';
import _ from 'lodash';
import DateButton from './Date Button';
import DatePickerView from './Date Picker View';
import DropdownSelector from './Dropdown Selector';
import SvgPortfolio from './Icons/Svg Portfolio';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { a_funds, a_grid_data, a_loading, a_originals, a_selected_tab, a_trades_input } from './atoms';
import { a_compare_input, a_date_picker_visible, a_families, a_input } from './atoms';
import { useState } from 'react';
import { BLUE, COMPARE } from './const';
import { MOCK_TRADE_NODES, MOCK_COMPARE_NODES } from './Mock Data';
import { handleModalClick } from './utils';

const LoaderPopup = (props) => {
    const { onExit } = props;
    const datePickerVisible = useAtomValue(a_date_picker_visible);
    const tab = useAtomValue(a_selected_tab);
    const funds = useAtomValue(a_funds);
    const families = useAtomValue(a_families);
    const input = useAtomValue(a_input);
    const [date1, setDate1] = useState(input.date1);
    const [date2, setDate2] = useState(input.date2);
    const setTradesInput = useSetAtom(a_trades_input);
    const setCompareInput = useSetAtom(a_compare_input);
    const setGridNodes = useSetAtom(a_grid_data);
    const [loading, setLoading] = useAtom(a_loading);
    const [dateId, setDateId] = useState(null);
    const setOriginals = useSetAtom(a_originals);

    const compare = tab === COMPARE;
    const [fname1, setFundOrFamilyName] = useState(input.fname1 || (compare ? 'BFAF' : _.first(_.keys(families))));
    const [fname2, setFundName2] = useState(input.fname2 || 'BFAF');

    const handleExit = ok => {
        onExit && onExit();

        if (!ok) {
            return;
        }

        setLoading(true);

        if (compare) {
            setCompareInput({ date1, fname1: fname1, date2, fname2: fname2 });

            _.delay(() => {
                const nodes = _.cloneDeep(MOCK_COMPARE_NODES);
                setGridNodes({ nodes });

                setLoading(false);
            }, 1000);
        } else {
            setTradesInput({ date: date1, fname: fname1 });

            _.delay(() => {
                const nodes = _.cloneDeep(MOCK_TRADE_NODES);
                setGridNodes({ nodes });

                const json = JSON.stringify(nodes);
                setOriginals({ local: json, global: json });

                setLoading(false);
            }, 1000);
        }
    };

    const isDate1 = dateId === 'date1';
    const setDate = date => isDate1 ? setDate1(date) : setDate2(date);

    const id = 'loader-modal';
    const background = 'none';
    const width = '175px';
    const justifyContent = 'start';
    const height = compare ? 120 : 90;
    const items = _.keys(compare ? funds : families);
    const ok = !loading;

    return <div id={id} className='modal-screen dimmed'
        onClick={(e) => e.target.id === id && handleModalClick(e, () => handleExit(false))}>
        <Popup ok='Load' isOk={ok} style={{ left: 430, top: 135, width: 310, height, padding: '10px' }}
            onExit={handleExit}>
            <div style={{ display: 'grid' }}>
                <div className='grid-cols' style={{ placeContent: 'start' }}>
                    <DateButton id='date1' date={date1} onClick={setDateId} style={{ background, width, justifyContent }} />
                    <DropdownSelector id='input.dd1' items={items} selectedItem={fname1 || 'BFAF'} setItem={setFundOrFamilyName}
                        offset='center' icon={<SvgPortfolio width={28} many={!compare} />} style={{ background }} />
                </div>
                {compare && <div className='grid-cols' style={{ placeContent: 'start' }}>
                    <DateButton id='date2' date={date2} onClick={setDateId} style={{ background, width, justifyContent }} color={BLUE} />
                    <DropdownSelector id='input.dd2' items={items} selectedItem={fname2 || 'BFAF'} setItem={setFundName2}
                        offset='center' icon={<SvgPortfolio width={28} many={false} color={BLUE} />} style={{ background }} />
                </div>}
                {datePickerVisible && <DatePickerView bid={dateId} date={isDate1 ? date1 : date2} setDate={setDate}/>}
            </div>
        </Popup>
    </div>;
};

export default LoaderPopup;