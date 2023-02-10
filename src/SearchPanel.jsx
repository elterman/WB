import { useState, useEffect, useRef } from 'react';
import { BUTTON_BACKGROUND, DOWN, UP } from './const';

const SearchPanel = (props) => {
    const { id, height, placeholder, value, clear, onSubmit, focus, onChange, onUpDown } = props;
    const [info, setInfo] = useState(null);
    const [filter, setFilter] = useState('');
    const [timer, setTimer] = useState(null);
    const _input = useRef(null);

    useEffect(() => {
        focus && _input.current.focus();
    }, [focus]);

    useEffect(() => {
        if (value) {
            setFilter(value);
            setInfo([value, value.toLowerCase()]);
        }
    }, [value]);

    useEffect(() => {
        if (clear) {
            setFilter('');
            setInfo({});
        }
    }, [clear]);

    useEffect(() => {
        setFilter(info ? info[1] : null);
        _input.current.focus();
    }, [info]);

    const handleChange = (e) => {
        clearTimeout(timer);

        const f = e.target.value;
        setFilter(f);

        const fupper = f?.toUpperCase();

        if (info?.[0] !== fupper) {
            setTimer(
                setTimeout(() => {
                    setInfo(f ? [fupper, f] : {});
                    onChange && onChange(fupper);
                }, 500)
            );
        }
    };

    const handleBlur = () => {
        if (!info) {
            setFilter('');
        }
    };

    const handleX = () => {
        if (!filter) {
            return;
        }

        setFilter('');
        setInfo({});
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleX();
            onChange && onChange('');
            return;
        }

        if (e.key === UP || e.key === DOWN) {
            if (!onUpDown) {
                return;
            }

            e.preventDefault();
            onUpDown(e.key);
            // handleX();
            return;
        }

        if (e.key === 'Enter') {
            if (!onSubmit) {
                return;
            }

            onSubmit();
            setTimeout(handleX, 500);
            return;
        }
    };

    const classes = `search-panel ${props.classes || ''}`;
    const style = { height: `${height}px`, background: BUTTON_BACKGROUND };

    return (
        <div className={classes} style={{ ...props.style }}>
            <input
                id={id}
                ref={_input}
                className="search-box"
                style={{ ...style }}
                type="text"
                autoComplete="off"
                placeholder={placeholder || 'search'}
                spellCheck="false"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                value={filter || ''}
            />
            <div
                className={`search-x ${filter ? 'search-x-enabled' : ''}`}
                style={{ ...style }}
                onClick={() => {
                    handleX();
                    onChange && onChange('');
                }}>
                <div>×</div>
            </div>
        </div>
    );
};

export default SearchPanel;
