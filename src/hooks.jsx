import { useState, useCallback } from 'react';
import { useToaster } from './Toaster';
import _ from 'lodash';
import { a_palette } from './atoms';
import { PALETTES } from './const';
import { useAtom } from 'jotai';

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

export const useChangePalette = () => {
    const [pkey, setPaletteKey] = useAtom(a_palette);

    return (prev) => {
        const keys = _.keys(PALETTES);
        const last = keys.length - 1;

        let i = _.findIndex(keys, k => k === pkey);
        i = prev ? (i > 0 ? i - 1 : last) : (i < last ? i + 1 : 0);

        setPaletteKey(keys[i]);

        const obs = document.getElementsByClassName('higrid-view');
        _.get(obs, 0)?.focus();
    };
};
