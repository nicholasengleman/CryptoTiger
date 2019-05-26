import React, { Component } from "react";
import styles from "./DataMenu.module.scss";

import { connect } from "react-redux";
import classNames from "classnames";

import DataPeriod from "./DataPeriod/DataPeriod";
import DataFilter from "./DataFilter/DataFilter";

class DataMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDataType: "price",
      selectedDataID: ""
    };
  }

  getDataTypes = () => {
    let values = Object.values(this.props.cryptos[0].data);
    let data_types = [];

    for (const value of values) {
      if (!data_types.includes(value.data_type)) {
        data_types.push(value.data_type);
      }
    }
    return data_types;
  };

  getDataPeriodTypes = () => {
    let values = Object.values(this.props.cryptos[0].data);
    let data_periods = [];

    for (const value of values) {
      if (value.data_type === this.state.selectedDataType) {
        if (value.data_period_type !== "current") {
          if (!data_periods.includes(value.data_period_type)) {
            data_periods.push(value.data_period_type);
          }
        }
      }
    }

    return data_periods;
  };

  getDataPeriods = period_type => {
    let values = Object.values(this.props.cryptos[0].data);
    let data_periods = [];

    for (const value of values) {
      if (value.data_type === this.state.selectedDataType) {
        if (value.data_period_type === period_type) {
          data_periods.push({
            data_id: value.data_id,
            data_period: value.data_period
          });
        }
      }
    }
    return data_periods;
  };

  handleSetDataType = event => {
    this.setState({ selectedDataType: event.currentTarget.textContent });
  };

  handleSetDataID = data_id => {
    this.setState({ selectedDataID: data_id });
  };

  render() {
    //creates the left sidebar component: "Price, Volumn, etc"
    let data_types = this.getDataTypes().map(function(data) {
      return (
        <div
          className={classNames(
            styles.dataType,
            this.state.selectedDataType === data
              ? styles.dataTypeSelected
              : null
          )}
          onClick={this.handleSetDataType}
          key={data}
        >
          <p>{data}</p>
        </div>
      );
    }, this);

    //creates the timeframe type components (horuly, daily, etc) and then the individial timeframes(5min, 1hr, etc) inside each component
    let data_periodtypes = this.getDataPeriodTypes().map(function(data) {
      return (
        <div className={styles.dataPeriodType} key={data}>
          <div className={styles.dataPeriodTypeHeader}>{data}</div>
          {this.getDataPeriods(data).map(function(period) {
            return (
              <DataPeriod
                key={period.data_id}
                selectedPeriod={this.state.selectedDataID}
                {...period}
                setDataID={this.handleSetDataID}
              />
            );
          }, this)}
        </div>
      );
    }, this);

    //renders all the above above components
    return (
      <div
        className={classNames(
          styles.container,
          this.props.dataMenu.open ? styles.open : styles.closed
        )}
      >
        <div className={styles.dataTypeWindow}>{data_types}</div>
        <div className={styles.dataPeriodsWindow}>{data_periodtypes}</div>
        {this.state.selectedDataID && <DataFilter />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataMenu: state.dataMenu,
    cryptos: state.cryptos
  };
};

export default connect(
  mapStateToProps,
  null
)(DataMenu);
