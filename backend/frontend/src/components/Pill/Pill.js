import React from "react";
import "./Pill.scss";

import classNames from "classnames";

const Pill = ({ ...props }) => {
    const classes = classNames({
        pill: true,
        selected: props.selected === true,

        //btn sizes
        small: props.size === "small",
        medium: props.size === "medium", //default
        large: props.size === "large"
    });

    return (
        <button className={classes} {...props}>
            {props.name}
            {props.fontawesomecode && <i className={`${props.fontawesomecode}`}></i>}
        </button>
    );
};

export default Pill;
