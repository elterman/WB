import SvgSpinner from './Icons/Svg Spinner';

const Spinner = (props) => {
    const { style, width } = props;

    return (
        <div className="spinner-screen" style={{ ...style }}>
            <SvgSpinner classes="spinner" width={width} />
        </div>
    );
};

export default Spinner;
