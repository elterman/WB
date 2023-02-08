import { useAtomValue } from 'jotai';
import { a_loading, a_selected_tab } from './atoms';
import BenchmarksPage from './Benchmarks Page';
import ComparePage from './Compare Page';
import { BENCHMARKS, COMPARE, METRICS, TARGETS } from './const';
import MetricsPage from './Metrics Page';
import TargetPage from './Targets Page';
import Spinner from './Spinner';
import TabPanel from './Tab Panel';

const ContentArea = () => {
    const selectedTab = useAtomValue(a_selected_tab);
    const loading = useAtomValue(a_loading);

    const renderPage = () => {
        switch (selectedTab) {
            case TARGETS: return <TargetPage />;
            case COMPARE: return <ComparePage />;
            case BENCHMARKS: return <BenchmarksPage />;
            case METRICS: return <MetricsPage />;
            default: return null;
        }
    };

    return (
        <div className='content-area root-scroll'>
            <TabPanel />
            {loading ? <Spinner width={160} /> : renderPage()}
        </div>
    );
};

export default ContentArea;
