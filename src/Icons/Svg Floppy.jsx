import { GREEN } from '../const';

const Icon = ({ style = {}, width, disabled = false, color = GREEN, viewBox = '0 0 100 100' }) => {
    return (
        <svg id='svg-floppy' style={{ ...style }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg"
            filter={disabled ? 'grayscale()' : ''} opacity={disabled ? 0.5 : 1} cursor={disabled ? 'initial' : 'pointer'}>

            {/* <rect width='100%' height='100%' fill='darkslategray' /> */}

            <g stroke={color} strokeWidth={6} strokeLinecap='round' strokeLinejoin='round' fill='none'>
                <polyline points='3,3 80,3 97,18 97,97 3,97 3,3'/>
                <polyline points='21,3 21,30 65,30 65,3'/>
                <polyline points='21,97 21,60 75,60 75,97'/>
            </g>
        </svg>
    );
};

export default Icon;