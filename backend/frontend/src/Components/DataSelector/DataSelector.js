import React, { Component } from "react";
import styles from "./DataSelector.module.scss";

import DataPeriodContainer from "./../DataPeriodContainer/DataPeriodContainer";
import { connect } from "react-redux";
import {
    closeDataMenu,
    setSelectedDataGroup,
    setSelectedDataPeriod,
    setSelectedDataType
} from "../../store/actions/actionCreators";

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
                        <ButtonLarge
                            fontawesomecode="fas fa-dollar-sign"
                            name="Price"
                            onClick={() => this.props.setSelectedDataType("price")}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fas fa-water"
                            name="Volume"
                            onClick={() => this.props.setSelectedDataType("volume")}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fa-poll"
                            name="Market Cap"
                            onClick={() => this.props.setSelectedDataType("market cap")}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Select a Data Group:</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <ButtonLarge
                            fontawesomecode="fas fa-dollar-sign"
                            name="Hours"
                            onClick={() => this.props.setSelectedDataGroup("hours")}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fas fa-water"
                            name="Days"
                            onClick={() => this.props.setSelectedDataGroup("days")}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fa-poll"
                            name="Weeks"
                            onClick={() => this.props.setSelectedDataGroup("weeks")}
                        />
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
        closeDataMenu: () => dispatch(closeDataMenu()),
        setSelectedDataType: DataType => dispatch(setSelectedDataType(DataType)),
        setSelectedDataGroup: DataGroup => dispatch(setSelectedDataGroup(DataGroup))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
