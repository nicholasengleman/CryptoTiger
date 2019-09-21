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
                <div className={`${styles.section} ${styles.section1}`}>
                    <div className={styles.sectionHeader}>
                        <h2>1) Select a Data Type</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <ButtonLarge
                            fontawesomecode="fas fa-dollar-sign"
                            name="Price"
                            onClick={() => this.props.setSelectedDataType("price")}
                            selected={this.props.selected.dataType === "price"}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fas fa-water"
                            name="Volume"
                            onClick={() => this.props.setSelectedDataType("volume")}
                            selected={this.props.selected.dataType === "volume"}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fa-poll"
                            name="Market Cap"
                            onClick={() => this.props.setSelectedDataType("market cap")}
                            selected={this.props.selected.dataType === "market cap"}
                        />
                    </div>
                </div>

                <div className={`${styles.section} ${styles.section2}`}>
                    <div className={styles.sectionHeader}>
                        <h2>2) Select a Data Group</h2>
                    </div>
                    <div className={styles.sectionBody}>
                        <ButtonLarge
                            fontawesomecode="fas fa-dollar-sign"
                            name="Hours"
                            onClick={() => this.props.setSelectedDataGroup("hours")}
                            selected={this.props.selected.dataGroup === "hours"}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fas fa-water"
                            name="Days"
                            onClick={() => this.props.setSelectedDataGroup("days")}
                            selected={this.props.selected.dataGroup === "days"}
                        />
                        <ButtonLarge
                            fontawesomecode="fas fa-poll"
                            name="Weeks"
                            onClick={() => this.props.setSelectedDataGroup("weeks")}
                            selected={this.props.selected.dataGroup === "weeks"}
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
        selected: state.cryptoData.selected
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
