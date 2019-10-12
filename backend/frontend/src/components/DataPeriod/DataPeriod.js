import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../img/checkmark_white.png";
import arrow from "../../img/arrow_cute.png";

import axios from "axios";
import styles from "./DataPeriod.module.scss";

import { connect } from "react-redux";
import {
    setSelectedDataPeriod,
    setSelectedDataName,
    processNewColumnData,
    resetCryptoBuffer
} from "../../store/actions/actionCreators";

class DataPeriod extends Component {
    handleSetPeriod = (periodTime, periodName, periodNumber) => {
        this.props.resetCryptoBuffer();
        this.props.setSelectedDataPeriod(periodNumber);
        this.props.setSelectedDataName(periodName);
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${periodTime}`)
            .then(response => {
                this.props.processNewColumnData(
                    periodName,
                    periodNumber,
                    response.data,
                    this.props.selectedData.selectedColumnId
                );
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

const mapStateToProps = state => {
    return {
        selectedData: state.selectedData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetCryptoBuffer: () => dispatch(resetCryptoBuffer()),
        setSelectedDataPeriod: dataPeriod => dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: dataName => dispatch(setSelectedDataName(dataName)),
        processNewColumnData: (periodName, periodNumber, responseData, selectedColumnId) =>
            dispatch(processNewColumnData(periodName, periodNumber, responseData, selectedColumnId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataPeriod);
