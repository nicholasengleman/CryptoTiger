import React, { Component } from "react";
import styles from "./DataPeriodContainer.module.scss";
import DataPeriod from "./../DataPeriod/DataPeriod";
import { connect } from "react-redux";

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
                            period_name={`${period} ${this.props.selectedTimeframe} Price`}
                            selected={
                                this.props.selected.dataPeriod === `${period} ${this.props.selectedTimeframe} Price`
                            }
                        />
                    );
                }, this)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected: state.cryptoData.selected
    };
};

export default connect(mapStateToProps)(DataPeriodContainer);
