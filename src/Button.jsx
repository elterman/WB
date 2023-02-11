import { useTooltip } from './Tooltip';

const Button = (props) => {
    const tooltip = useTooltip();
    const { id, children, style, classes = '', disabled = false, label, onClick, tip = '', tipoff } = props;
    const marginLeft = children ? '10px' : 0;
    const hasLabel = label !== undefined && label !== null;

    return (
        <div id={id} className={`button ${disabled ? 'button-disabled' : ''} ${classes}`}
            onClick={() => !disabled && onClick()}
            style={{ ...style, color: style?.color }}
            onMouseEnter={(e) => tooltip.show({ e, text: tip, dx: tipoff?.x || 0, dy: tipoff?.y || 0 })}
            onMouseLeave={tooltip.hide}>
            {children}
            {hasLabel && !disabled && <div style={{ marginLeft }}>{label}</div>}
            {hasLabel && disabled && <div className='disabled-text' style={{ marginLeft }}>{label}</div>}
        </div>
    );
};

export default Button;
