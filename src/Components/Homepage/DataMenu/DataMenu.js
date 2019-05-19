import React, { Component } from "react";
import styles from "./DataMenu.module.scss";
import { getAllCryptos } from "../../../Services/cryptos";

class DataMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column_id: "",
      selectedDataType: "price"
    };
  }

  getDataTypes = () => {
    const cryptos = getAllCryptos();

    let values = Object.values(cryptos[0].data);
    let data_types = [];

    for (const value of values) {
      if (!data_types.includes(value.data_type)) {
        data_types.push(value.data_type);
      }
    }
    return data_types;
  };

  getDataPeriodTypes = () => {
    const cryptos = getAllCryptos();

    let values = Object.values(cryptos[0].data);
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
    const cryptos = getAllCryptos();

    let values = Object.values(cryptos[0].data);
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

  handleSetDataTypeClick = event => {
    this.setState({ selectedDataType: event.currentTarget.textContent });
  };

  render() {
    let data_types = this.getDataTypes().map(function(data) {
      return (
        <div
          className={styles.dataType}
          onClick={this.handleSetDataTypeClick}
          key={data}
        >
          <p>{data}</p>
        </div>
      );
    }, this);

    let data_periodtypes = this.getDataPeriodTypes().map(function(data) {
      return (
        <div className={styles.dataPeriodType} key={data}>
          {data}
          {this.getDataPeriods(data).map(function(period) {
            return (
              <div className={styles.period} key={period.data_id}>
                <p>{period.data_period}</p>
              </div>
            );
          })}
        </div>
      );
    }, this);

    return (
      <div className={styles.container}>
        <div className={styles.dataTypeWindow}>{data_types}</div>
        <div className={styles.dataPeriodsWindow}>{data_periodtypes}</div>
      </div>
    );
  }
}

export default DataMenu;
