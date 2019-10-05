import React, { Component } from "react";
import styles from "./DataPeriodContainer.module.scss";
import DataPeriod from "./../DataPeriod/DataPeriod";
import { connect } from "react-redux";

class DataPeriodContainer extends Component {
    render() {
        let dateMultiplier = 1;
        if (this.props.selectedPeriod.dataGroup === "day") {
            dateMultiplier = 24;
        }
        if (this.props.selectedPeriod.dataGroup === "week") {
            dateMultiplier = 24 * 7;
        }

        return (
            <div className={styles.dataPeriodsContainer}>
                {this.props.periods.map(function(period) {
                    return (
                        <DataPeriod
                            key={period}
                            periodTime={period * 60 * 60 * dateMultiplier}
                            periodNumber={period}
                            periodName={`${period} ${this.props.selectedPeriod.dataGroup} price`}
                            selected={
                                this.props.selectedPeriod.dataName.toLowerCase() ===
                                `${period} ${this.props.selectedPeriod.dataGroup} price`
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
        selectedPeriod: state.selectedData.selectedPeriod
    };
};

export default connect(mapStateToProps)(DataPeriodContainer);
