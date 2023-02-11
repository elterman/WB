import _ from 'lodash';
import { useAtomValue } from 'jotai';
import { a_tooltip } from './atoms';
import { useSpring, animated } from 'react-spring';
import { useAtom } from 'jotai';
import { windowSize } from './utils';

const Tooltip = () => {
    const info = useAtomValue(a_tooltip);
    const show = info.text;
    const { opacity } = useSpring({ opacity: `${info.text ? 1 : 0}`, delay: info.delay, immediate: !info.text });

    if (!show) {
        return null;
    }

    const { x, y, text, style } = info;

    const display = show ? 'initial' : 'none';
    const left = `${x}px`;
    const top = `${y}px`;

    return (
        <animated.div className="tooltip" style={{ display, left, top, opacity, ...style }}>
            {_.isFunction(text) ? text() : _.map(text?.toString().split('\n'), (l, i) => <div key={i}>{l}</div>)}
        </animated.div>
    );
};

export default Tooltip;

export const useTooltip = () => {
    const [tooltipInfo, setTooltipInfo] = useAtom(a_tooltip);

    const show = (props) => {
        const { e, text, anchor = 'target', minRightOffset = 0, style } = props;

        const dx = props.dx || 0;
        const dy = props.dy || 35;
        const delay = props.delay || 200;

        if (e) {
            let point = { x: e.clientX, y: e.clientY };

            if (anchor !== 'pointer') {
                const r = e.currentTarget.getBoundingClientRect();
                point = { x: r?.x, y: r?.y };
            }

            const { x: wx } = windowSize();
            point.x = Math.min(point.x, wx - minRightOffset);

            text && setTooltipInfo({ text, x: point.x + dx, y: point.y + dy, delay, style });
        } else if (!_.isEmpty(tooltipInfo)) {
            setTooltipInfo({});
        }
    };

    const hide = () => show({});

    return { show, hide };
};
