import React from "react";
import "./Button.scss";

import classNames from "classnames";

const Button = ({ ...props }) => {
    const classes = classNames({
        btn: true,
        selected: props.selected === true,

        //btn text-alignment
        centerText: props.textalign === "center", //default
        leftText: props.textalign === "left",

        //btn sizes
        small: props.size === "small",
        medium: props.size === "medium", //default
        large: props.size === "large",

        // color themes
        blue: props.theme === "blue",
        red: props.theme === "red",
        white: props.theme === "white"
    });

    return (
        <button className={classes} {...props}>
            {props.fontawesomecode && <i className={`${props.fontawesomecode}`}></i>}
            {props.name}
        </button>
    );
};

Button.defaultProps = {
    selected: false,
    size: "medium",
    textalign: "center",
    theme: "blue",
    name: "button"
};

export default Button;
