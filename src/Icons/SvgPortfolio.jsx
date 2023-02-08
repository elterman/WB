import { GREEN, WHITE } from '../const';

const SvgPortfolio = props => {
    let { width, color = GREEN, disabled = false, viewBox = '0 0 700 600', style, many = false } = props;
    color = disabled ? WHITE : color;
    const transform = many ? 'translate(-30,-15)' : null;

    return (
        <svg style={{ ...style }} width={width} height={width} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            <g>
                {/* <rect width="100%" height="100%" fill="#345" stroke="none" /> */}
                <g transform={transform} opacity={disabled ? 0.23 : 1}>
                    {many && <path stroke={color} strokeWidth={35} strokeLinecap='round' strokeLinejoin='round' fill='none'
                        d='m190,500 v40 h450 v-320 h-50' />}
                    <path xmlns="http://www.w3.org/2000/svg" fill={color} d="m575.68 132.16h-134.4v-48.719c0-4.457-1.7695-8.7305-4.9219-11.879-3.1523-3.1523-7.4219-4.9219-11.879-4.9219h-148.96c-4.457 0-8.7266 1.7695-11.879 4.9219-3.1523 3.1484-4.9219 7.4219-4.9219 11.879v48.719h-134.4c-4.457 0-8.7305 1.7695-11.879 4.9219-3.1523 3.1484-4.9219 7.4219-4.9219 11.879v327.6c0 4.457 1.7695 8.7305 4.9219 11.879 3.1484 3.1523 7.4219 4.9219 11.879 4.9219h451.36c4.457 0 8.7305-1.7695 11.879-4.9219 3.1523-3.1484 4.9219-7.4219 4.9219-11.879v-327.6c0-4.457-1.7695-8.7305-4.9219-11.879-3.1484-3.1523-7.4219-4.9219-11.879-4.9219zm-283.36-31.922h115.36v31.922h-115.36zm91.281 152.32v38.641h-67.203v-38.641zm175.28 207.2h-417.76v-171.36h141.68v19.043c0 4.4531 1.7695 8.7266 4.918 11.879 3.1523 3.1484 7.4258 4.918 11.883 4.918h100.8c4.457 0 8.7305-1.7695 11.883-4.918 3.1484-3.1523 4.918-7.4258 4.918-11.879v-19.043h141.68z" />
                </g>
            </g>
        </svg>
    );
};

export default SvgPortfolio;
