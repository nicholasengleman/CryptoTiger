import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../../../img/checkmark_white.png";
import arrow from "../../../../img/arrow_cute.png";

import styles from "./DataPeriod.module.scss";

class DataPeriod extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.setDataID(this.props.data_id)}
        className={classNames(styles.period)}
      >
        <div className={styles.arrow}>
          <img src={arrow} alt="" />
        </div>
        <div
          className={classNames(
            styles.checkbox,
            this.props.data_id === this.props.selectedPeriod
              ? styles.selected
              : null
          )}
        >
          <img src={checkmark} alt="" />
        </div>
        <p>{this.props.data_period}</p>
      </div>
    );
  }
}

export default DataPeriod;
