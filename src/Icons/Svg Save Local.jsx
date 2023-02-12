import { APP_BACKGROUND, BLUE, DARK_GOLD, GOLD, GREEN } from '../const';
import { useTooltip } from '../Tooltip';

const Icon = ({ style = {}, width, disabled = false, color = GREEN, viewBox = '0 0 100 100' }) => {
    const tooltip = useTooltip();

    return (
        <svg id='svg-floppy' style={{ ...style }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
            filter={disabled ? 'grayscale()' : ''} opacity={disabled ? 0.5 : 1} cursor={disabled ? 'initial' : 'pointer'}
            onMouseEnter={e => tooltip.show({ e, text: 'Save for Myself' })} onMouseLeave={tooltip.hide}>

            {/* <rect width='100%' height='100%' fill='darkslategray' /> */}

            <g stroke={color} strokeWidth={4} strokeLinecap='round' strokeLinejoin='round' fill='none' transform='translate(-10,-0)'>
                <polyline points='12,12 74,12 88,24 88,88 12,88 12,12' />
                <path d='M12,12 74,12 88,24 88,88 12,88 12,12 ' />
                <polyline points='26,12 26,32 60,32 60,12' />
                <path d='M 26,12 26,32 60,32 60,12' />
                <polyline points='26,88 26,55 74,55 74,88' />
                <path d='M 26,88 26,55 74,55 74,88' />
            </g>

            <g strokeWidth={6} stroke={DARK_GOLD} fill={APP_BACKGROUND} transform='scale(0.65) translate(55,55)'>
                <circle cx={50} cy={50} r={55} stroke='none'/>
                <circle cx={50} cy={50} r={46} />
                <circle cx={50} cy={34} r={14} />
                <path d='M18,80 C 30,50 70,50 82,80' />
            </g>
        </svg>
    );
};

export default Icon;