import PropTypes from "prop-types";

import React from "react";
import "./Bar.scss";

const Bar = ({ percentage }) => (
    <div className="barScale">
        <div className="overlay" style={{ width: percentage }}></div>
    </div>
);

export default Bar;

Bar.propTypes = {
    percentage: PropTypes.number
};
