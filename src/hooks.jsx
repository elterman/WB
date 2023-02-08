import { useState, useCallback } from 'react';
import { useToaster } from './Toaster';
import _ from 'lodash';

export const useForceUpdate = (timeout) => {
    const [, setState] = useState();
    const doSetState = () => setState({});

    return useCallback(() => {
        timeout && setTimeout(doSetState, 1);
        doSetState();
    }, [timeout]);
};

export const useReportError = () => {
    const addToast = useToaster();

    const reportError = (res, type = 'error') => {
        if (res?.ok) {
            return;
        }

        const data = res?.data;
        const msg = data?.ErrorMessage || data?.errorMessage || 'Unknown Error';
        const details = data?.errorDetails || '';

        addToast({ type, renderCallback: () => <div>{msg}{details && <br />}{details}</div> });
    };

    return reportError;
};

export const useComingSoon = () => {
    const [once, setOnce] = useState(true);

    const renderComingSoon = () => {
        once && _.delay(() => setOnce(false));

        const transform = `rotate(${once ? 0 : 360}deg)`;
        const transition = 'transform 500ms ease-in-out';

        return <div id='coming-soon'>
            <div style={{ transform, transition }}>COMING SOON</div>
        </div>;
    };

    return renderComingSoon;
};