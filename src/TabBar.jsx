import _ from 'lodash';

const TabBar = (props) => {
    const { style, itemStyle, tabs, selectedTab, onSelectedChange } = props;

    return (
        <div style={{ display: 'grid', ...style }}>
            <div className="tabs-border"></div>
            <div className="tabs">
                {_.map(tabs, (item) => {
                    const classes = `tab ${item === selectedTab ? 'tab-selected' : ''}`;
                    return (
                        <div id={`tab-${item}`} key={item} className={classes} onClick={() => onSelectedChange && onSelectedChange(item)}>
                            <div className="tab-drop" style={{ ...itemStyle }}>{item}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabBar;
