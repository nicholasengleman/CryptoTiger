import React, { Component } from "react";
import styles from "./DataPeriodContainer.module.scss";
import DataPeriod from "./../DataPeriod/DataPeriod";
import { connect } from "react-redux";

class DataPeriodContainer extends Component {
    render() {
        return (
            <div className={styles.dataPeriodsContainer}>
                {this.props.periods.map(function(period) {
                    return (
                        <DataPeriod
                            key={period}
                            periodTime={period * 60 * 60}
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
        selectedPeriod: state.cryptoData.selectedPeriod
    };
};

export default connect(mapStateToProps)(DataPeriodContainer);
