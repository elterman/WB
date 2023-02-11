import React, { useState } from 'react';
import { DARK_GOLD, GOLD } from '../const';

const Icon = ({ style = {}, color = DARK_GOLD, hoverColor = GOLD, width = '100%', viewBox = '0 0 100 100' }) => {
  const [_color, setColor] = useState(color);

  return <svg style={{ ...style, display: 'block' }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    onMouseOver={() => setColor(hoverColor)} onMouseLeave={() => setColor(color)}>
    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}
    <circle cx={50} cy={50} r={40} fill='none' stroke={_color} strokeWidth={6} />
    <text x={42} y={72} fill={_color} fontSize={58} fontFamily='Roboto Bold' fontWeight='bold'>i</text>
  </svg>;
};

export default Icon;
