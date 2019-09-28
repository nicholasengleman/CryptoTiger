import React from "react";
import "./Bar.scss";

const Bar = React.forwardRef((props, ref) => {

    return (
        <div
            style={{
                height: props.height || 0,
                marginBottom: props.marginBottom || 0,
                marginTop: props.marginTop || 0,
                backgroundColor: props.backgroundColor,
                width: props.width
            }}
            className={`bar ${[props.directionalClass]}`}
            ref={ref}
        >
            <div className="tooltip">
                <p>{props.tooltip && props.tooltip.name}</p>
                <p>{props.tooltip && props.tooltip.value}%</p>
                <div className="tooltipArrow"></div>
            </div>
        </div>
    );
});

export default Bar;
