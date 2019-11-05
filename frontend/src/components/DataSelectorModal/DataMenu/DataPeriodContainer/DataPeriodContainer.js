import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./DataPeriodContainer.module.scss";
import DataPeriod from "./DataPeriod/DataPeriod";
import { connect } from "react-redux";

class DataPeriodContainer extends Component {
    render() {
        const { selectedPeriod, periods } = this.props;

        let dateMultiplier = 1;
        if (selectedPeriod.dataGroup === "day") {
            dateMultiplier = 24;
        }
        if (selectedPeriod.dataGroup === "week") {
            dateMultiplier = 24 * 7;
        }

        return (
            <div className={styles.dataPeriodsContainer}>
                {periods.map(function(period) {
                    return (
                        <DataPeriod
                            key={period}
                            periodTime={period * 60 * 60 * dateMultiplier}
                            periodNumber={period}
                            periodName={`${period} ${selectedPeriod.dataGroup} price`}
                            selected={
                                selectedPeriod.dataName.toLowerCase() === `${period} ${selectedPeriod.dataGroup} price`
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

DataPeriodContainer.propTypes = {
    selectedPeriod: PropTypes.object,
    period: PropTypes.array
};

export default connect(mapStateToProps)(DataPeriodContainer);
