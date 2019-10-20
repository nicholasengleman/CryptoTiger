import React, { Component } from "react";
import styles from "./DataMenu.module.scss";

import DataPeriodContainer from "./DataPeriodContainer/DataPeriodContainer";
import DataBox from "../../DataBox/DataBox";
import { connect } from "react-redux";
import { closeDataMenu, setSelectedDataGroup, setSelectedDataType } from "../../../store/actions/actionCreators";

import Pill from "../../Pill/Pill";

class DataMenu extends Component {
    render() {
        return (
            <div className={styles.dataMenuContainer}>
                <DataBox title="Data Type">
                    <Pill
                        fontawesomecode="fas fa-dollar-sign"
                        name="Price"
                        onClick={() => this.props.setSelectedPeriodDataType("price")}
                        selected={this.props.selected.dataType === "price"}
                        size={"large"}
                    />
                    <Pill
                        fontawesomecode="fas fas fa-water"
                        name="Volume"
                        onClick={() => this.props.setSelectedPeriodDataType("volume")}
                        selected={this.props.selected.dataType === "volume"}
                        size={"large"}
                    />
                </DataBox>

                <DataBox title="Data Group">
                    <Pill
                        fontawesomecode="fas fa-dollar-sign"
                        name="Hours"
                        onClick={() => this.props.setSelectedDataGroup("hour")}
                        selected={this.props.selected.dataGroup === "hour"}
                        size={"large"}
                    />
                    <Pill
                        fontawesomecode="fas fas fa-water"
                        name="Days"
                        onClick={() => this.props.setSelectedDataGroup("day")}
                        selected={this.props.selected.dataGroup === "day"}
                        size={"large"}
                    />
                    <Pill
                        fontawesomecode="fas fa-poll"
                        name="Weeks"
                        onClick={() => this.props.setSelectedDataGroup("week")}
                        selected={this.props.selected.dataGroup === "week"}
                        size={"large"}
                    />
                </DataBox>

                <DataBox title="Data Period">
                    <DataPeriodContainer periods={this.props.timeframes[this.props.selected.dataGroup] || [1]} />
                </DataBox>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timeframes: state.dataMenu.dataMenu.timeframes,
        selected: state.selectedData.selectedPeriod
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
