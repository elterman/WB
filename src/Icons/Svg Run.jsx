import { GREEN, WHITE } from '../const';

const Icon = ({ style = {}, width, disabled = false, color = GREEN, viewBox = '0 0 100 100' }) => {
    if (disabled) {
        color = WHITE;
    }

    return (
        <svg id='svg-run' style={{ ...style }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            <g opacity={disabled ? 0.23 : 1}>
                <path stroke={color} strokeWidth={10} fill='none' d="M10,0 L90,50 L10,100 z" />
            </g>
        </svg>
    );
};

export default Icon;
