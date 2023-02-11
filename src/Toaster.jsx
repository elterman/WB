import { useState, useEffect, useRef } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { a_toast } from './atoms';
import _ from 'lodash';
import { BLUE, GREEN, RED } from './const';
import { useSpring, animated, config } from 'react-spring';
import { useForceUpdate } from './hooks';
import { windowSize } from './utils';

const shades = ['#882532', '#dc751c', '#306A4E', '#166E9C'];

const Toaster = () => {
    const l = useRef({ toasts: [] }).current;
    const forceUpdate = useForceUpdate();
    const [newToast, setNewToast] = useAtom(a_toast);

    useEffect(() => {
        if (newToast) {
            l.toasts.push(newToast);
            setNewToast(null);
        }
    }, [l.toasts, newToast, setNewToast]);

    if (!l.toasts.length) {
        return null;
    }

    const left = `${(windowSize().x - 360) / 2}px`;

    return (
        <div className="toaster root-scroll" style={{ left }}>
            {_.map(l.toasts, (t) => (
                <Toast key={t.key} toast={t} toasts={l.toasts} onRemove={forceUpdate} />
            ))}
        </div>
    );
};

export default Toaster;

const Toast = (props) => {
    const { toast, toasts, onRemove } = props;
    const { message, type, duration, renderCallback } = toast;
    const [fade, setFade] = useState(false);
    const l = useRef({}).current;
    const forceUpdate = useForceUpdate();
    const color = type === 'error' ? RED : type === 'warning' ? '#f8a762' : type === 'success' ? GREEN : BLUE;
    const background = type === 'error' ? shades[0] : type === 'warning' ? shades[1] : type === 'success' ? shades[2] : shades[3];

    const remove = () => {
        _.remove(toasts, (t) => t === toast);
        setFade(true);
    };

    const onClick = (e) => {
        if (e.target.id !== 'toast-x') {
            l.cannotExpire = true;
            forceUpdate();
        }
    };

    const { spring } = useSpring({
        spring: 1,
        from: { spring: 0 },
        onRest: () => duration && setTimeout(() => !l.cannotExpire && remove(), duration),
    });

    const { opacity } = useSpring({
        opacity: fade ? 0 : 1,
        from: { opacity: fade ? 1 : 0 },
        config: fade ? config.stiff : config.default,
        onRest: () => fade && onRemove(),
    });

    const transform = spring.to((s) => `translateY(${(s - 1) * 50}px)`);
    const zIndex = 10000 - toasts.indexOf(toast);
    const style = { fontSize: `${type === 'info' ? '18px' : '16px'}` };
    const classes = `toast-x ${duration && !l.cannotExpire ? 'toast-x-exp' : ''}`;

    return (
        <animated.div style={{ display: 'grid', opacity, transform, zIndex }} onClick={onClick}>
            <div className="toast" style={{ background, borderColor: color }}>
                <div className="toast-message root-scroll">{renderCallback ? renderCallback() : message}</div>
                <div id="toast-x" className={classes} onClick={remove}>
                    ×
                </div>
            </div>
            <div className="toast-icon" style={style}>
                {type === 'error' ? '✖' : type === 'warning' ? '!' : type === 'success' ? '✔' : 'ℹ'}
            </div>
        </animated.div>
    );
};

export const useToaster = () => {
    const setNewToast = useSetAtom(a_toast);

    const addToast = (props) => {
        const { type, message, duration, renderCallback } = props;
        setNewToast({ key: Math.random(), type: type || 'info', message, renderCallback, duration });
    };

    return addToast;
};
