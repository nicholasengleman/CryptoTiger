import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "./DataSelector/DataSelector";
import HistogramContainer from "./HistogramContainer/HistogramContainer";

class DataSelectorContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={classNames(
          this.props.dataMenu.open ? styles.open : styles.closed
        )}
      >
        <div className={styles.RowOne}>
          <div className={styles.DataPresets}>
            <div className={styles.Preset}>
              <h2>1 Hour</h2>
              <h3>30 Saves</h3>
            </div>
            <div className={styles.Preset}>
              <h2>4 Hour</h2>
              <h3>20 Saves</h3>
            </div>
            <div className={styles.Preset}>
              <h2>3 Days</h2>
              <h3>14 Saves</h3>
            </div>
            <div className={styles.Preset}>
              <h2>4 Weeks</h2>
              <h3>11 Saves</h3>
            </div>
            <div className={styles.Preset}>
              <h2>14 Days</h2>
              <h3>14 Saves</h3>
            </div>
            <div className={styles.Preset}>
              <h2>2 Weeks</h2>
              <h3>11 Saves</h3>
            </div>
          </div>
          <DataSelector />
        </div>
        <div className={styles.RowTwo}>
          <HistogramContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataMenu: state.dataMenu.dataMenu
  };
};

export default connect(mapStateToProps)(DataSelectorContainer);
