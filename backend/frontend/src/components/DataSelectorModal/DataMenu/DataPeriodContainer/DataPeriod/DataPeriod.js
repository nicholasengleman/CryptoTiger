import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../../../../img/checkmark_white.png";
import arrow from "../../../../../img/arrow_cute.png";

import axios from "axios";
import styles from "./DataPeriod.module.scss";

import { connect } from "react-redux";
import {
    setSelectedDataPeriod,
    setSelectedDataName,
    processNewColumnData,
    resetCryptoBuffer
} from "../../../../../store/actions/actionCreators";

class DataPeriod extends Component {
    handleSetPeriod = (dataType, dataGroup, dataPeriod, dataName, periodTime) => {
        this.props.resetCryptoBuffer();
        this.props.setSelectedDataPeriod(dataPeriod);
        this.props.setSelectedDataName(dataName);
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${periodTime}`)
            .then(response => {
                this.props.processNewColumnData(
                    response.data,
                    this.props.selectedData.selectedColumnId,
                    true,
                    dataType,
                    dataGroup,
                    dataPeriod,
                    dataName
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
                    this.handleSetPeriod(
                        this.props.selectedData.selectedPeriod.dataType,
                        this.props.selectedData.selectedPeriod.dataGroup,
                        this.props.periodNumber,
                        this.props.periodName,
                        this.props.periodTime
                    )
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
        processNewColumnData: (
            responseData,
            selectedColumnId,
            processForHistogram,
            dataType,
            dataGroup,
            dataPeriod,
            dataName
        ) =>
            dispatch(
                processNewColumnData(
                    responseData,
                    selectedColumnId,
                    processForHistogram,
                    dataType,
                    dataGroup,
                    dataPeriod,
                    dataName
                )
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataPeriod);
