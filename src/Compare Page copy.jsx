import { useComingSoon } from './hooks';
import HiGrid from './HiGrid';
import { useAtomValue } from 'jotai';
import { a_compare_input } from './atoms';

const ComparePage = () => {
    const renderComingSoon = useComingSoon();
    const { fname1, fname2 } = useAtomValue(a_compare_input);

    if (fname1 !== 'BFAF' || fname2 !== 'GRRUF') {
        return renderComingSoon();
    }

    const columnHeaders = [fname1, fname2, 'Delta'];

    return <HiGrid columnHeaders={columnHeaders}
        sectionHeaders={['Current Targets (%)', 'Trades (%)', 'Final Weights (%)']}
        readOnly getCellStyle={null} warn={false} />;
};

export default ComparePage;
