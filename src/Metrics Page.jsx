import { useComingSoon } from './hooks';

const MetricsPage = () => {
    const renderComingSoon = useComingSoon();
    return renderComingSoon();
};

export default MetricsPage;
