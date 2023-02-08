import { useState } from 'react';
import './Popup.css';
import { useSpring, animated } from 'react-spring';

const Popup = (props) => {
    const { children, style = {}, ok = 'OK', onExit, isOk = true } = props;
    const [exit, setExit] = useState(0);
    const OK = 1;
    const CANCEL = -1;

    const { spring } = useSpring({ spring: 1, from: { spring: 0 } });
    const { opacity } = useSpring({ opacity: exit ? 0 : 1 });

    return (
        <animated.div className="popup" style={{ ...style, opacity, height: spring.to((s) => `${s * style.height}px`) }}>
            {children}
            <div className="popup-buttons">
                <div
                    className={`popup-button ${isOk ? '' : 'popup-button-disabled'}`}
                    onClick={() => {
                        if (isOk) {
                            setExit(OK);
                            onExit(true);
                        }
                    }}>
                    {ok}
                </div>
                <div
                    className="popup-button"
                    onClick={() => {
                        setExit(CANCEL);
                        onExit(false);
                    }}>
                    Cancel
                </div>
            </div>
        </animated.div>
    );
};

export default Popup;
