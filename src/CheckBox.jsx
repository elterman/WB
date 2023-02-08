import React from 'react';
import SvgCheck from './Icons/SvgCheck';
import { WHITE } from './const';
import { useSpring, animated } from 'react-spring';
import { useTooltip } from './Tooltip';

const CheckBox = (props) => {
    const { checked, disabled, label, handleToggle, style, gap, tip = '', tipoff } = props;
    const { spring } = useSpring({ spring: checked ? 1 : 0, velocity: 50 });
    const classes = `grid-cols checkbox ${disabled ? 'disabled-text' : ''}`;
    const boxClasses = `check-box ${disabled ? 'check-box-disabled' : ''}`;
    const tooltip = useTooltip();

    return (
        <div className={classes} style={{ ...style }} onClick={(e) => !disabled && handleToggle(!checked, e)}
            onMouseEnter={(e) => tooltip.show({ e, text: tip, dx: tipoff?.x || 0, dy: tipoff?.y || 0 })}
            onMouseLeave={tooltip.hide}>
            <div className={boxClasses} />
            <animated.div
                style={{
                    gridArea: '1/1',
                    justifySelf: 'center',
                    transformOrigin: '30% 70%',
                    transform: spring.to((s) => `scale(${s})`),
                }}>
                <SvgCheck width={12} color={WHITE} />
            </animated.div>
            <div style={{ gridArea: '1/2', marginLeft: `${gap || 10}px` }}>{label}</div>
        </div>
    );
};

export default CheckBox;
