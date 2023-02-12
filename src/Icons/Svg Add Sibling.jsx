import { GREEN, OFF_WHITE } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = (props) => {
  const { style = {}, width = '100%', viewBox = '0 0 100 100' } = props;
  const { above, disabled = false, color1 = OFF_WHITE, color2 = GREEN, color3 = '#C0C0C0' } = props;
  const tooltip = useTooltip();

  const onMouseEnter = e => tooltip.show({ e, text: `Add Sibling ${above ? 'Above' : 'Below'}` });

  const y1 = 25;
  const y2 = 82;

  return <svg style={{ ...style }} display={'block'} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
    filter={disabled ? 'grayscale()' : ''} opacity={disabled ? 0.5 : 1} cursor={disabled ? 'initial' : 'pointer'}
    onMouseEnter={onMouseEnter} onMouseLeave={tooltip.hide}>

    {/* <rect width='100%' height='100%' fill='darkslategray' /> */}

    <circle id='dot2' cx={12} cy={20} r={3} fill={color3} />
    <use href="#dot2" transform="translate(15,0)" />
    <use href="#dot2" transform="translate(30,0)" />
    <use href="#dot2" transform="translate(0,15)" />
    <use href="#dot2" transform="translate(0,30)" />
    <use href="#dot2" transform="translate(0,45)" />
    <use href="#dot2" transform="translate(0,60)" />
    <use href="#dot2" transform="translate(15,60)" />
    <use href="#dot2" transform="translate(30,60)" />

    <circle cx={80} cy={above ? y2 : y1 - 5} r={12} fill={color1} />
    <circle cx={80} cy={above ? y1 : y2 - 5} r={15} stroke={color2} strokeWidth={5} fill='none' />
  </svg>;
};

export default Icon;
