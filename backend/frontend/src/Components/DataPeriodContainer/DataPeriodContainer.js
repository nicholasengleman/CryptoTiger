import React, { Component } from "react";
import styles from "./DataPeriodContainer.module.scss";
import DataPeriod from "./../DataPeriod/DataPeriod";

class DataPeriodContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.dataPeriodsContainer}>
                {this.props.periods.map(function(period) {
                    const timeframe_description = period === 1 ? " Hour" : "Hours";
                    return (
                        <DataPeriod
                            key={period}
                            selectedDataName={this.props.selectedTimeframe}
                            period_time={period * 60 * 60}
                            period_name={`${period}${timeframe_description} Price`}
                            // handleSetPeriod={this.handleSetPeriod}
                        />
                    );
                }, this)}
            </div>
        )
    }
};

export default DataPeriodContainer;