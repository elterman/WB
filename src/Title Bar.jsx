import { useEffect } from 'react';
import User from './Auth/User';
import { DARK_GOLD, GREEN } from './const';
import { useForceUpdate } from './hooks';

const TitleBar = () => {
    const forceUpdate = useForceUpdate(true);

    useEffect(() => {
        window.addEventListener('resize', forceUpdate);
        return () => window.removeEventListener('resize', forceUpdate);
    }, [forceUpdate]);

    return (
        <div className="title-bar">
            <div />
            <div className="title" style={{ grid: 'auto auto / auto auto', columnGap: '20px' }}>
                <div style={{ gridArea: '1/1', color: GREEN }}>ASSET ALLOCATION</div>
                <div style={{ gridArea: '2/1', color: DARK_GOLD, letterSpacing: '1.8px', justifySelf: 'end' }}>PORTFOLIO</div>
                <div className='workbench'>WORKBENCH</div>
            </div>
            <div />
            <User />
        </div>
    );
};

export default TitleBar;
