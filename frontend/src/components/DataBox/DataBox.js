import React from "react";
import PropTypes from "prop-types";
import styles from "./DataBox.module.scss";

const DataBox = ({ children, title, style }) => (
    <div className={styles.section} style={style}>
        <div className={styles.sectionHeader}>
            <h2>{title}</h2>
            {/* <span className={styles.childrenCount}>{children.length}</span> */}
        </div>
        <div className={styles.sectionBody}>{children}</div>
    </div>
);

DataBox.propTypes = {
    title: PropTypes.string
};

export default DataBox;
