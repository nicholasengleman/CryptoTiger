import React from "react";
import "./Button.scss";

import classNames from "classnames";

Button.defaultProps = {
    selected: "false",
    shape: "square",
    size: "medium",
    textAlign: "center",
    theme: "blue",
    name: "button"
};

//created Button with regular function so default props could be defined above the function
function Button({ ...props }) {
    const classes = classNames({
        btn: true,
        selected: props.selected === true,

        //btn shapes
        square: props.shape === "square", //default
        pill: props.shape === "pill",

        //btn text-alignment
        centerText: props.textAlign === "center", //default
        leftText: props.textAlign === "left",

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
}

export default Button;
