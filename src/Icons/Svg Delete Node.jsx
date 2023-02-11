import { RED } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = (props) => {
  const { style = {}, width = '100%', viewBox = '0 0 100 100' } = props;
  const { disabled, color2 = RED, color3 = '#FFFFFF80' } = props;
  const tooltip = useTooltip();

  return <svg style={{ ...style }} display={'block'} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    filter={disabled ? 'grayscale()' : ''} opacity={disabled ? 0.5 : 1} cursor={disabled ? 'initial' : 'pointer'}
    onMouseEnter={e => tooltip.show({ e, text: 'Delete Item' })} onMouseLeave={tooltip.hide}>

    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}

    <circle id='dot3' cx={12} cy={50} r={3} fill={color3} />
    <use href="#dot3" transform="translate(0,15)" />
    <use href="#dot3" transform="translate(0,30)" />
    <use href="#dot3" transform="translate(0,-15)" />
    <use href="#dot3" transform="translate(0,-30)" />
    <use href="#dot3" transform="translate(15,0)" />
    <use href="#dot3" transform="translate(30,0)" />
    <path stroke={color2} strokeWidth={5} fill='none' d='M 65,35 95,65 M 95,35 65,65'/>
  </svg>;
};

export default Icon;
