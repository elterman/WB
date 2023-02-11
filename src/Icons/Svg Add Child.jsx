import React from 'react';
import { DARK_BLUE, OFF_WHITE, GREEN } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = (props) => {
  const { style = {}, width = '100%', viewBox = '0 0 100 100' } = props;
  const { disabled, color1 = OFF_WHITE, color2 = GREEN, color3 = OFF_WHITE } = props;
  const tooltip = useTooltip();

  return <svg style={{ ...style }} display={'block'} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    filter={disabled ? 'grayscale()' : ''} cursor={disabled ? 'initial' : 'pointer'}
    onMouseEnter={e => !disabled && tooltip.show({ e, text: 'Add Child' })} onMouseLeave={tooltip.hide}>
    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}
    <circle cx={12} cy={20} r={12} fill={color1} />
    <circle id='dot' cx={12} cy={48} r={5} fill={color3} />
    <use href="#dot" transform="translate(0,15)" />
    <use href="#dot" transform="translate(0,30)" />
    <use href="#dot" transform="translate(15,30)" />
    <use href="#dot" transform="translate(30,30)" />
    {/* <g stroke={color2} strokeWidth={6}>
      <polyline points='62,77 98,77' />
      <polyline points='80,60 80,94' />
    </g> */}
    <circle id='dot' cx={80} cy={77} r={12} fill={color2} />
  </svg>;
};

export default Icon;
