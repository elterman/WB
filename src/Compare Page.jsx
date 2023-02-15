import { useComingSoon } from './hooks';
import { useAtomValue } from 'jotai';
import { a_compare_input } from './atoms';
import TargetsBasePage from './Targets Base Page';

const ComparePage = () => {
    const renderComingSoon = useComingSoon();
    const { fname1, fname2 } = useAtomValue(a_compare_input);

    if (fname1 !== 'BFAF' || fname2 !== 'GRRUF') {
        return renderComingSoon();
    }

    const columnHeaders = [fname1, fname2, 'Delta'];

    return <TargetsBasePage columnHeaders={columnHeaders} readOnly />;
};

export default ComparePage;
