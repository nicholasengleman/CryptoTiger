import React, {Component} from "react";
import styles from "./DataSelector.module.scss";
import classNames from "classnames";
import {connect} from "react-redux";
import axios from "axios";

import {
    processNewColumnData,
    updateLiveColumnView,
    closeDataMenu,
    emptyHistogramData,
    setSelectedColumn
} from "../../../store/actions/actionCreators";

import DataPeriod from "./DataPeriod/DataPeriod";

class DataMenu extends Component {


    handleSetPeriod = (new_timeframe_seconds, new_timeframe_name) => {
        if (this.props.selectedColumn !== new_timeframe_name) {

            this.props.emptyHistogramData();
            this.props.setSelectedColumn(new_timeframe_name);
            axios
                .get(
                    `http://localhost:5000/api/crypto-data/getColumnData/${new_timeframe_seconds}`
                )
                .then(response => {
                    this.props.processNewColumnData(new_timeframe_name, response.data);
                })
                .catch(error => {
                    console.log("[Error]", error);
                });
        }
    };


    render() {
        return (
            <div className={styles.dataMenuContainer}>
                <div className={classNames(styles.dataContainer)}>
                    <div className={styles.dataPeriodsWindow}>
                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Hour</div>
                            {Array.from(
                                {length: this.props.dataMenu.timeframes.hours},
                                (v, k) => k + 1
                            ).map(function (period) {
                                const timeframe_description = period === 1 ? " Hour" : " Hours";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedDataName={this.props.selectedColumn}
                                        period_time={period * 60 * 60}
                                        period_name={`${period}${timeframe_description} Price`}
                                        handleSetPeriod={this.handleSetPeriod}
                                    />
                                );
                            }, this)}
                        </div>

                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Day</div>
                            {Array.from(
                                {length: this.props.dataMenu.timeframes.days},
                                (v, k) => k + 1
                            ).map(function (period) {
                                const timeframe_description = period === 1 ? " Day" : " Days";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedDataName={this.props.selectedColumn}
                                        period_time={period * 60 * 60 * 24}
                                        period_name={`${period}${timeframe_description} Price`}
                                        handleSetPeriod={this.handleSetPeriod}
                                    />
                                );
                            }, this)}
                        </div>

                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Weeks</div>
                            {Array.from(
                                {length: this.props.dataMenu.timeframes.weeks},
                                (v, k) => k + 1
                            ).map(function (period) {
                                const timeframe_description = period === 1 ? " Week" : " Weeks";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedDataName={this.props.selectedColumn}
                                        period_time={period * 60 * 60 * 24 * 7}
                                        period_name={`${period}${timeframe_description} Price`}
                                        handleSetPeriod={this.handleSetPeriod}
                                    />
                                );
                            }, this)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataMenu: state.dataMenu.dataMenu,
        selectedColumn: state.cryptoData.selectedColumn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processNewColumnData: (new_timeframe_name, new_column_data) =>
            dispatch(processNewColumnData(new_timeframe_name, new_column_data)),
        updateLiveView: () => dispatch(updateLiveColumnView()),
        closeDataMenu: () => dispatch(closeDataMenu()),
        emptyHistogramData: () => dispatch(emptyHistogramData()),
        setSelectedColumn: column => dispatch(setSelectedColumn(column))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
