import React from "react";
import PropTypes from "prop-types";
import "./Pill.scss";

import classNames from "classnames";

const Pill = ({ selected, size, name, fontawesomecode }) => {
    const classes = classNames({
        pill: true,
        selected: selected === true,

        //btn sizes
        small: size === "small",
        medium: size === "medium", //default
        large: size === "large"
    });

    return (
        <button className={classes}>
            {name}
            {fontawesomecode && <i className={`${fontawesomecode}`}></i>}
        </button>
    );
};

Pill.propTypes = {
    selected: PropTypes.bool,
    size: PropTypes.string,
    name: PropTypes.string,
    fontawesomecode: PropTypes.string
};
export default Pill;
