import React, { Component } from "react";
import { connect } from "react-redux";
import { changeColumnDataID } from "../../../../store/actions/actionCreators";

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

const mapDispatchToProps = dispatch => {
  return {
    handleDataChange: data_id => dispatch(changeColumnDataID(data_id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DataPeriod);
