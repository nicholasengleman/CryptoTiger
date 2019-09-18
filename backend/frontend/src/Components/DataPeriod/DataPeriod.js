import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../img/checkmark_white.png";
import arrow from "../../img/arrow_cute.png";

import axios from "axios";
import styles from "./DataPeriod.module.scss";

class DataPeriod extends Component {

  handleSetPeriod = (new_timeframe_seconds, new_timeframe_name) => {
    if (this.props.selectedColumn !== new_timeframe_name) {
        this.props.emptyHistogramData();
        this.props.setSelectedTimeframe(new_timeframe_name);
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${new_timeframe_seconds}`)
            .then(response => {
                this.props.processNewColumnData(new_timeframe_name, response.data);
            })
            .catch(error => {
                console.log("[Error]", error);
            });
    }
};
  render() {
    return (
      <div
        onClick={() =>
          this.props.handleSetPeriod(
            this.props.period_time,
            this.props.period_name
          )
        }
        className={classNames(styles.period)}
      >
        <div className={styles.arrow}>
          <img src={arrow} alt="" />
        </div>
        <div
          className={classNames(
            styles.checkbox,
            this.props.period_name === this.props.selectedDataName
              ? styles.selected
              : null
          )}
        >
          <img src={checkmark} alt="" />
        </div>
        <p>{this.props.period_name}</p>
      </div>
    );
  }
}

export default DataPeriod;
