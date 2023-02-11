import React from 'react';
import { GREEN, OFF_WHITE } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = (props) => {
  const { style = {}, width = '100%', viewBox = '0 0 100 100' } = props;
  const { above, disabled = false, color1 = OFF_WHITE, color2 = GREEN } = props;
  const tooltip = useTooltip();

  const onMouseEnter = e => tooltip.show({ e, text: `Add Sibling ${above ? 'Above' : 'Below'}` });

  const y1 = 30;
  const y2 = 77;

  return <svg style={{ ...style }} display={'block'} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    filter={disabled ? 'grayscale()' : ''} opacity={disabled ? 0.5 : 1} cursor={disabled ? 'initial' : 'pointer'}
    onMouseEnter={onMouseEnter} onMouseLeave={tooltip.hide}>
    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}
    <circle cx={50} cy={above ? y2 : y1 - 5} r={12} fill={color1} />
    <g stroke={color2} strokeWidth={5} fill='none'>
      {above ? <circle cx={50} cy={y1} r={15} /> : <circle cx={50} cy={y2 - 5} r={15} />}
    </g>
  </svg>;
};

export default Icon;
