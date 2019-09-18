import React from "react";
import styles from "./buttonLarge.module.scss";

import className from "classnames";

const ButtonLarge = props => {
    return (
        <button className={styles.btn}>
            <i class={`${props.fontAwesomeCode}`}></i>
            {props.name}
        </button>
    );
};

export default ButtonLarge;
