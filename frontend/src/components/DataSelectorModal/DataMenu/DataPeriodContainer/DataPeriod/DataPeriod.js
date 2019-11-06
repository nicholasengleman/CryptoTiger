import React, { Component } from "react";
import PropTypes from "prop-types";
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
    handleSetPeriod = (
        dataType,
        dataGroup,
        dataPeriod,
        dataName,
        periodTime
    ) => {
        const {
            resetCryptoBuffer,
            setSelectedDataPeriod,
            setSelectedDataName,
            processNewColumnData,
            selectedData
        } = this.props;
        resetCryptoBuffer();
        setSelectedDataPeriod(dataPeriod);
        setSelectedDataName(dataName);
        axios
            .get(
                `http://3.132.176.114:443/api/crypto-data/getColumnData/${periodTime}`
            )
            .then(response => {
                processNewColumnData(
                    response.data,
                    selectedData.selectedColumnId,
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
        const {
            selectedData,
            periodNumber,
            periodName,
            periodTime,
            selected
        } = this.props;
        return (
            <div
                onClick={() =>
                    this.handleSetPeriod(
                        selectedData.selectedPeriod.dataType,
                        selectedData.selectedPeriod.dataGroup,
                        periodNumber,
                        periodName,
                        periodTime
                    )
                }
                className={classNames(styles.period)}
            >
                <div className={styles.arrow}>
                    <img src={arrow} alt="" />
                </div>
                <div
                    className={classNames(
                        styles.checkbox,
                        selected ? styles.selected : null
                    )}
                >
                    <img src={checkmark} alt="" />
                </div>
                <p> {periodName}</p>
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
        setSelectedDataPeriod: dataPeriod =>
            dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: dataName =>
            dispatch(setSelectedDataName(dataName)),
        processNewColumnData: (
            responseData,
            selectedColumnId,
            dataType,
            dataGroup,
            dataPeriod,
            dataName
        ) =>
            dispatch(
                processNewColumnData(
                    responseData,
                    selectedColumnId,
                    dataType,
                    dataGroup,
                    dataPeriod,
                    dataName
                )
            )
    };
};

DataPeriod.propTypes = {
    resetCryptoBuffer: PropTypes.func,
    setSelectedDataPeriod: PropTypes.func,
    setSelectedDataName: PropTypes.func,
    processNewColumnData: PropTypes.func,
    selectedData: PropTypes.object,
    periodNumber: PropTypes.number,
    periodName: PropTypes.string,
    periodTime: PropTypes.number,
    selected: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataPeriod);
