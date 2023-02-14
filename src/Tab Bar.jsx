import _ from 'lodash';

const TabBar = (props) => {
    const { style, itemStyle, tabs, selectedTab, onSelectedChange } = props;

    return (
        <div style={{ display: 'grid', ...style }}>
            <div className="tabs-border"></div>
            <div className="tabs">
                {_.map(tabs, (item, i) => {
                    const classes = `tab ${item === selectedTab ? 'tab-selected' : ''}`;
                    const eid = `tab-${i + 1}`;

                    return (
                        <div key={i} id={eid} className={classes} onClick={() => onSelectedChange && onSelectedChange(item)}>
                            <div id={`${eid}-name`} className="tab-content" style={{ ...itemStyle }}>{item}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabBar;
