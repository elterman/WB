import { useRef, useEffect } from 'react';
import './App.css';
import TitleBar from './Title Bar';
import ContentArea from './Content Area';
import Tooltip from './Tooltip';
import Toaster from './Toaster';
import SelectorDropdown from './Selector Dropdown';
// import AuthProvider from './Auth/Auth Provider';
import { useAtom } from 'jotai';
import { a_families, a_funds } from './atoms';

const App = () => {
    const _this = useRef(null);

    useEffect(() => {
        const disableContextMenu = (e) => e.preventDefault();
        window.addEventListener('contextmenu', disableContextMenu);
        return () => window.removeEventListener('contextmenu', disableContextMenu);
    }, [_this]);

    const [funds, setFunds] = useAtom(a_funds);
    const [families, setFamilies] = useAtom(a_families);

    if (!funds) {
        setFunds({ 'BFAF': {}, 'GRRUF': {}, 'GAAR': {}, 'INFLAION': {} });
    }

    if (!families) {
        setFamilies({
            'BFAF': { members: ['BFAF', 'GRRUF', 'GAAR', 'INFLATION'] },
            'US': {
                members: ['US Norm Wt', 'Quality', 'Quant US', 'US Opportunistic Value', 'US Small Value', 'Short - S&P 500',
                    'Short - Russell 2000']
            },
            'INTL': {
                members: ['INTL Norm Wt', 'Quant INTL', 'Quant INTL Small Value', 'Quant INTL Value', 'Short - EAFE', 'Short - TOPIX',
                    'Japan Small Value', 'Usonian High Capacity', 'Usonian Low Capacity']
            },
            'EM': { members: ['EM Norm Wt', 'EM BRK', 'EM BRK ex China', 'Quant EMG', 'Short - EM', 'EMF'] },
        });
    }

    return (
        // <AuthProvider>
        <div ref={_this} className='App'>
            <TitleBar style={{ gridArea: '1/1' }} />
            <ContentArea />
            <SelectorDropdown />
            <Tooltip />
            <canvas id="canvas" className="canvas" />
            <Toaster />
        </div>
        // </AuthProvider>
    );
};

export default App;
