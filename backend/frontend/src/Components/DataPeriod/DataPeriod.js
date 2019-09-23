import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../img/checkmark_white.png";
import arrow from "../../img/arrow_cute.png";

import axios from "axios";
import styles from "./DataPeriod.module.scss";

import { connect } from "react-redux";
import {
    emptyHistogramData,
    setSelectedPeriodDataPeriod,
    setSelectedPeriodDataName,
    processNewColumnData
} from "../../store/actions/actionCreators";

class DataPeriod extends Component {
    handleSetPeriod = (newTimeframeSeconds, newTimeframeName, newTimeframePeriod) => {
        console.log(newTimeframeName);

        this.props.emptyHistogramData();
        this.props.setSelectedPeriodDataPeriod(newTimeframePeriod);
        this.props.setSelectedPeriodDataName(newTimeframeName);
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${newTimeframeSeconds}`)
            .then(response => {
                this.props.processNewColumnData(newTimeframeName, response.data);
            })
            .catch(error => {
                console.log("[Error]", error);
            });
    };
    render() {
        return (
            <div
                onClick={() =>
                    this.handleSetPeriod(this.props.periodTime, this.props.periodName, this.props.periodNumber)
                }
                className={classNames(styles.period)}
            >
                <div className={styles.arrow}>
                    <img src={arrow} alt="" />
                </div>
                <div className={classNames(styles.checkbox, this.props.selected ? styles.selected : null)}>
                    <img src={checkmark} alt="" />
                </div>
                <p> {this.props.periodName}</p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emptyHistogramData: () => dispatch(emptyHistogramData()),
        setSelectedPeriodDataPeriod: dataPeriod => dispatch(setSelectedPeriodDataPeriod(dataPeriod)),
        setSelectedPeriodDataName: dataName => dispatch(setSelectedPeriodDataName(dataName)),
        processNewColumnData: (newTimeframeName, responseData) =>
            dispatch(processNewColumnData(newTimeframeName, responseData))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(DataPeriod);
