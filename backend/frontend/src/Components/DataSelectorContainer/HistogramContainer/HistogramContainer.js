import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./HistogramContainer.module.scss";
import HistogramSlider from "./Histogram/Histogram";

import { addFilterParameter } from "../../../store/actions/actionCreators";

class HistogramContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterParameters: {}
    };
  }

  handleFilterParametersChange = filterParameters =>
    this.setState({ filterParameters });

  handleAddWithFilter = () => {
    this.props.addFilterParameter(this.state.filterParameters);
  };

  render() {
    return (
      <div className={styles.HistogramContainer}>
        <HistogramSlider
          data={this.props.histogramData}
          barMargin={3}
          getBoundries={this.handleFilterParametersChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    histogramData: state.cryptoData.histogramData,
    dataMenu: state.dataMenu.dataMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFilterParameter: filterParameters =>
      dispatch(addFilterParameter(filterParameters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistogramContainer);
