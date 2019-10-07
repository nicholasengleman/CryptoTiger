import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../img/checkmark_white.png";
import arrow from "../../img/arrow_cute.png";

import axios from "axios";
import styles from "./DataPeriod.module.scss";

import { connect } from "react-redux";
import { setSelectedDataPeriod, setSelectedDataName, processNewColumnData } from "../../store/actions/actionCreators";

class DataPeriod extends Component {
    handleSetPeriod = (newTimeframeSeconds, newTimeframeName, newTimeframePeriod) => {
        this.props.setSelectedDataPeriod(newTimeframePeriod);
        this.props.setSelectedDataName(newTimeframeName);
        console.log("Time since 1970: ", new Date().getTime() / 1000);
        console.log("Seconds: ", newTimeframeSeconds);
        console.log(this.props.selectedData.selectedColumnId);
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${newTimeframeSeconds}`)
            .then(response => {
                this.props.processNewColumnData(
                    newTimeframeName,
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
        setSelectedDataPeriod: dataPeriod => dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: dataName => dispatch(setSelectedDataName(dataName)),
        processNewColumnData: (newTimeframeName, responseData, selectedColumnId) =>
            dispatch(processNewColumnData(newTimeframeName, responseData, selectedColumnId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataPeriod);
