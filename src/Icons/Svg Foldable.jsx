import React from 'react';

const Icon = ({ style = {}, color = '#FFF', width = '100%', viewBox = '0 0 200 200' }) => (
  <svg style={{ ...style, display: 'block' }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    {/* <rect width='100%' height='100%' fill='#000' /> */}
    <g stroke={color} strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="80,30 150,100 80,170" />
    </g>
  </svg>
);

export default Icon;
