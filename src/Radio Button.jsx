import React from 'react';
import { useSpring, animated } from 'react-spring';

const RadioButton = (props) => {
    const { checked, label, handleToggle, style, gap, color } = props;
    const { spring } = useSpring({ spring: checked ? 1 : 0, velocity: 50 });

    return (
        <div className="grid-cols checkbox" style={{ ...style }} onClick={() => !checked && handleToggle()}>
            <div className="radio-outer" style={{ borderColor: color }} />
            <animated.div className="radio-inner" style={{ transform: spring.to((s) => `scale(${s})`), background: color }} />
            <div style={{ gridArea: '1/2', marginLeft: `${gap || 10}px`, color }}>{label}</div>
        </div>
    );
};

export default RadioButton;

export const renderGroupRadioButton = (label, selectedValue, handle, value = null) => {
    if (value == null) {
        value = label;
    }

    return <RadioButton label={label} checked={value === selectedValue} handleToggle={() => handle(value)} />;
};