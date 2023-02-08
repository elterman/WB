import { GREEN, WHITE } from '../const';

const Icon = ({ style = {}, width, disabled = false, color = GREEN, viewBox = '0 0 353.073 353.073' }) => {
    if (disabled) {
        color = WHITE;
    }

    return (
        <svg id='svg-check' style={{ ...style }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            <g opacity={disabled ? 0.23 : 1} fill={color}>
                <path d="M340.969,0H12.105C5.423,0,0,5.423,0,12.105v328.863c0,6.68,5.423,12.105,12.105,12.105h328.864
		c6.679,0,12.104-5.426,12.104-12.105V12.105C353.073,5.423,347.647,0,340.969,0z M67.589,18.164h217.895v101.884H67.589V18.164z
		 M296.082,327.35H57.003V176.537h239.079V327.35z M223.953,33.295h30.269v72.638h-30.269V33.295z M274.135,213.863H78.938v-12.105
		h195.197V213.863z M274.135,256.231H78.938v-12.105h195.197V256.231z M274.135,297.087H78.938v-12.105h195.197V297.087z"/>
            </g>
        </svg>
    );
};

export default Icon;