import React, { Component } from "react";
import styles from "./DataSelector.module.scss";

import DataPeriodContainer from "./../DataPeriodContainer/DataPeriodContainer";
import { connect } from "react-redux";
import {
    closeDataMenu,
    setSelectedPeriodDataGroup,
    setSelectedPeriodDataType
} from "../../store/actions/actionCreators";

import Button from "../Button/Button";

class DataMenu extends Component {
    render() {
        return (
            <div className={styles.dataMenuContainer}>
                <div className={`${styles.section} ${styles.section1}`}>
                    <div className={styles.sectionHeader}>
                        <h2>1) Select a Data Type</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <Button
                            fontawesomecode="fas fa-dollar-sign"
                            name="Price"
                            onClick={() => this.props.setSelectedPeriodDataType("price")}
                            selected={this.props.selected.dataType === "price"}
                            shape={"pill"}
                            theme={"white"}
                            textAlign={"left"}
                            size={"large"}
                        />
                        <Button
                            fontawesomecode="fas fas fa-water"
                            name="Volume"
                            onClick={() => this.props.setSelectedPeriodDataType("volume")}
                            selected={this.props.selected.dataType === "volume"}
                            shape={"pill"}
                            theme={"white"}
                            textAlign={"left"}
                            size={"large"}
                        />
                    </div>
                </div>

                <div className={`${styles.section} ${styles.section2}`}>
                    <div className={styles.sectionHeader}>
                        <h2>2) Select a Data Group</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <Button
                            fontawesomecode="fas fa-dollar-sign"
                            name="Hours"
                            onClick={() => this.props.setSelectedPeriodDataGroup("hours")}
                            selected={this.props.selected.dataGroup === "hours"}
                            shape={"pill"}
                            theme={"white"}
                            textAlign={"left"}
                            size={"large"}
                        />
                        <Button
                            fontawesomecode="fas fas fa-water"
                            name="Days"
                            onClick={() => this.props.setSelectedPeriodDataGroup("days")}
                            selected={this.props.selected.dataGroup === "days"}
                            shape={"pill"}
                            theme={"white"}
                            textAlign={"left"}
                            size={"large"}
                        />
                        <Button
                            fontawesomecode="fas fa-poll"
                            name="Weeks"
                            onClick={() => this.props.setSelectedPeriodDataGroup("weeks")}
                            selected={this.props.selected.dataGroup === "weeks"}
                            shape={"pill"}
                            theme={"white"}
                            textAlign={"left"}
                            size={"large"}
                        />
                    </div>
                </div>

                <div className={`${styles.section} ${styles.section3}`}>
                    <div className={styles.sectionHeader}>
                        <h2>3) Select a Data Period</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <DataPeriodContainer
                            periods={this.props.timeframes[this.props.selected.dataGroup] || [1]}
                            selectedTimeframe={this.props.selected.dataGroup}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timeframes: state.dataMenu.dataMenu.timeframes,
        selected: state.cryptoData.selectedPeriod
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeDataMenu: () => dispatch(closeDataMenu()),
        setSelectedPeriodDataType: DataType => dispatch(setSelectedPeriodDataType(DataType)),
        setSelectedPeriodDataGroup: DataGroup => dispatch(setSelectedPeriodDataGroup(DataGroup))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
