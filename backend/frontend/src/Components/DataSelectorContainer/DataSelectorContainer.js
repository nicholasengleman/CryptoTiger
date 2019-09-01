import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "./DataSelector/DataSelector";
import HistogramContainer from "./HistogramContainer/HistogramContainer";
//import PresetsContainer from "./PresetsContainer/PresetsContainer";

class DataSelectorContainer extends Component {


  render() {
    return (
      <div
        className={classNames(
          this.props.dataMenu.open ? styles.open : styles.closed
        )}
      >
        <DataSelector />
        <HistogramContainer />
        <div className={styles.btnContainer}>
          <button className="btn">Cancel</button><button className="btn">Apply</button>
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
