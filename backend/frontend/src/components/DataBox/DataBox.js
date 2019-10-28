import React from "react";
import styles from "./DataBox.module.scss";

const DataBox = ({ children, title }) => (
    <div className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2>{title}</h2>
            {/* <span className={styles.childrenCount}>{children.length}</span> */}
        </div>
        <div className={styles.sectionBody}>{children}</div>
    </div>
);

export default DataBox;
