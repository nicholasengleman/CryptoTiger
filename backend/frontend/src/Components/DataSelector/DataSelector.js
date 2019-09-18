import React, { Component } from "react";
import styles from "./DataSelector.module.scss";

import DataPeriodContainer from "./../DataPeriodContainer/DataPeriodContainer";
import { connect } from "react-redux";
import { processNewColumnData, updateLiveColumnView, closeDataMenu, emptyHistogramData, setSelectedTimeframe } from "../../store/actions/actionCreators";

import ButtonLarge from "../generic/ButtonLarge/ButtonLarge";

class DataMenu extends Component {
    render() {
        return (
            <div className={styles.dataMenuContainer}>
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Select a Data Type:</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <ButtonLarge fontAwesomeCode="fas fa-dollar-sign" name="Price" selected={true} />
                        <ButtonLarge fontAwesomeCode="fas fas fa-water" name="Volume" />
                        <ButtonLarge fontAwesomeCode="fas fa-poll" name="Market Cap" />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Select a Data Group:</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <ButtonLarge fontAwesomeCode="fas fa-dollar-sign" name="Hours" />
                        <ButtonLarge fontAwesomeCode="fas fas fa-water" name="Days" />
                        <ButtonLarge fontAwesomeCode="fas fa-poll" name="Weeks" />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Select a Period:</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <DataPeriodContainer periods={this.props.timeframes.hours} selectedTimeframe={"hours"} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timeframes: state.dataMenu.dataMenu.timeframes,
        selectedTimeframe: state.cryptoData.selectedTimeframe,
        selectedColumn: state.cryptoData.selectedColumn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processNewColumnData: (new_timeframe_name, new_column_data) => dispatch(processNewColumnData(new_timeframe_name, new_column_data)),
        updateLiveView: () => dispatch(updateLiveColumnView()),
        closeDataMenu: () => dispatch(closeDataMenu()),
        emptyHistogramData: () => dispatch(emptyHistogramData()),
        setSelectedTimeframe: timeframe => dispatch(setSelectedTimeframe(timeframe))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
