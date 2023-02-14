import { useAtom } from 'jotai';
import { a_selected_tab } from './atoms';
import { BENCHMARKS, COMPARE, TABS, TARGETS } from './const';
import InputControl from './Input Control';
import TabBar from './Tab Bar';

const TabPanel = () => {
    const [tab, setSelectedTab] = useAtom(a_selected_tab);
    const hasInput = tab === TARGETS || tab === COMPARE || tab === BENCHMARKS;

    return <div id='tab-panel' className='tab-panel'>
        <TabBar tabs={TABS} selectedTab={tab} style={{ gridArea: '1/1/1/span 3' }}
            onSelectedChange={setSelectedTab} />
        {hasInput && <div id='input-control' className='input-panel' style={{ gridArea: '1/1' }}><InputControl /></div>}
    </div>;
};

export default TabPanel;