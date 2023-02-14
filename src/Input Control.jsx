import { useAtomValue } from 'jotai';
import { a_input, a_selected_tab } from './atoms';
import dayjs from 'dayjs';
import { BLUE, BULLET, COMPARE, GREEN, OFF_WHITE } from './const';
import { nbsp } from './utils';
import { useState } from 'react';
import LoaderPopup from './Loader Popup';

const InputControl = () => {
    const tab = useAtomValue(a_selected_tab);
    const [popup, setPopup] = useState(false);
    const { date1, fname1, date2, fname2 } = useAtomValue(a_input);

    const separator = (text, pad = 1) => <div style={{ color: OFF_WHITE }}>{`${nbsp(pad)}${text}${nbsp(pad)}`}</div>;

    const render = (date, fname, color = GREEN) => {
        date = `${dayjs(date).format('MMMM D, YYYY')}`;

        return <>
            <div id={`input-date-${color}`} style={{ color }}>{date}</div>
            {separator(BULLET)}
            <div id={`input-fund-${color}`} style={{ color }}>{fname}</div>
        </>;
    };

    return <>
        <div id='input-prompt' className='prompt' style={{ cursor: 'pointer' }} onClick={() => setPopup(true)}>
            {fname1 ?
                <div className='grid-cols'>
                    {render(date1, fname1)}
                    {tab === COMPARE && <>{separator('vs.', 4)}{render(date2, fname2, BLUE)}</>}
                </div> :
                <>{tab === COMPARE ? 'Select Dates and Funds to Compare' : 'Select Date and Fund Family'}</>
            }
        </div>
        {popup && <LoaderPopup onExit={() => setPopup(false)} />}
    </>;
};

export default InputControl;