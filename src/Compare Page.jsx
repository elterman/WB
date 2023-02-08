import { useComingSoon } from './hooks';

const ComparePage = () => {
    const renderComingSoon = useComingSoon();
    return renderComingSoon();
};

export default ComparePage;
