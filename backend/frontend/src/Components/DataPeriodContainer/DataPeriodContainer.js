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
                            periodTime={period * 60 * 60}
                            periodNumber={period}
                            periodName={`${period} ${this.props.selectedTimeframe} Price`}
                            selected={
                                this.props.selected.dataName.toLowerCase() ===
                                `${period} ${this.props.selectedTimeframe} price`
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
        selected: state.cryptoData.selectedPeriod
    };
};

export default connect(mapStateToProps)(DataPeriodContainer);
