import React, { Component } from "react";
import styles from "./DataPeriod.module.scss";

class DataPeriod extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        onClick={() => this.props.handleDataChange(this.props.data_id)}
        className={styles.period}
      >
        {this.props.data_period}
      </div>
    );
  }
}

export default DataPeriod;
