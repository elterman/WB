import React from 'react';
import { DARK_BLUE, GREEN, OFF_WHITE } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = (props) => {
  const { style = {}, width = '100%', viewBox = '0 0 100 100' } = props;
  const { above, disabled = false, color1 = OFF_WHITE, color2 = GREEN } = props;
  const tooltip = useTooltip();

  const onMouseEnter = e => !disabled && tooltip.show({ e, text: `Add Sibling ${above ? 'Above' : 'Below'}` });

  const y1 = 20;
  const y2 = 77;

  return <svg style={{ ...style }} display={'block'} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    filter={disabled ? 'grayscale()' : ''} cursor={disabled ? 'initial' : 'pointer'}
    onMouseEnter={onMouseEnter} onMouseLeave={tooltip.hide}>
    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}
    <circle cx={50} cy={above ? y2 : y1} r={12} fill={color1} />
    <g stroke={color2} strokeWidth={6}>
      {above ? <>
        <polyline points={`32,${y1} 68,${y1}`} />
        <polyline points={`50,${y1 - 17} 50,${y1 + 17}`} />
      </> : <>
        <polyline points={`32,${y2} 68,${y2}`} />
        <polyline points={`50,${y2 - 17} 50,${y2 + 17}`} />

      </>}
    </g>
  </svg>;
};

export default Icon;
