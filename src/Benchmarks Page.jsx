import { useComingSoon } from './hooks';

const BenchmarksPage = () => {
    const renderComingSoon = useComingSoon();
    return renderComingSoon();
};

export default BenchmarksPage;
