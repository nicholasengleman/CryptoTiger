import React, { Component } from "react";
import styles from "./Cell.module.scss";
import classNames from "classnames";
import winning_normal from "../../../../img/winning-normal.png";
import losing_normal from "../../../../img/losing-normal.png";

class Cell extends Component {
  getValue = () => {
    let value = 0;
    if (
      this.props.columnData &&
      this.props.cryptoInfo &&
      this.props.cryptoInfo[this.props.columnData.data_id[0]] &&
      this.props.cryptoInfo[this.props.columnData.data_id[0]].data_value
    ) {
      value = this.props.cryptoInfo[this.props.columnData.data_id[0]]
        .data_value;
    }
    return value;
  };

  getName = () => {
    let name = "";
    if (
      this.props.columnData &&
      this.props.cryptoInfo &&
      this.props.cryptoInfo[this.props.columnData.data_id[0]] &&
      this.props.cryptoInfo[this.props.columnData.data_id[0]].data_name[0]
    ) {
      name = this.props.cryptoInfo[this.props.columnData.data_id[0]]
        .data_name[0];
    }
    return name;
  };

  render() {
    return (
      <div className={styles.dataContainer}>
        <span
          className={classNames(
            styles.priceData,
            this.getValue() > 0 ? styles.up : styles.down
          )}
        >
          {this.getValue()}
          <span className={styles.arrowContainer}>
            <img
              className={styles.arrow}
              src={this.getValue() > 0 ? winning_normal : losing_normal}
              alt=""
            />
          </span>
        </span>

        <div className={styles.description}> {this.getName()} </div>
      </div>
    );
  }
}

export default Cell;
