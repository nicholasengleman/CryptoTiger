import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./DataMenu.module.scss";

import DataPeriodContainer from "./DataPeriodContainer/DataPeriodContainer";
import DataBox from "../../DataBox/DataBox";
import { connect } from "react-redux";
import { closeDataMenu, setSelectedDataGroup, setSelectedDataType } from "../../../store/actions/actionCreators";

import Pill from "../../Pill/Pill";

class DataMenu extends Component {
    render() {
        const { selected, timeframes, setSelectedDataGroup } = this.props;
        return (
            <div className={styles.dataMenuContainer}>
                <DataBox title="Data Type">
                    <Pill
                        fontawesomecode="fas fa-dollar-sign"
                        name="Price"
                        // onClick={() => setSelectedDataType("price")}
                        selected={selected.dataType === "price"}
                        size={"large"}
                    />
                    {/* <Pill
                        fontawesomecode="fas fas fa-water"
                        name="Volume(coming soon)"
                        onClick={() => setSelectedPeriodDataType("volume")}
                        selected={this.props.selected.dataType === "volume"}
                        size={"large"}
                    /> */}
                </DataBox>

                <DataBox title="Data Group">
                    <Pill
                        fontawesomecode="fas fa-dollar-sign"
                        name="Hours"
                        onclick={() => this.props.setSelectedDataGroup("hour")}
                        selected={selected.dataGroup === "hour"}
                        size={"large"}
                    />
                    <Pill
                        fontawesomecode="fas fas fa-water"
                        name="Days"
                        onclick={() => this.props.setSelectedDataGroup("day")}
                        selected={selected.dataGroup === "day"}
                        size={"large"}
                    />
                    <Pill
                        fontawesomecode="fas fa-poll"
                        name="Weeks"
                        onclick={() => this.props.setSelectedDataGroup("week")}
                        selected={selected.dataGroup === "week"}
                        size={"large"}
                    />
                </DataBox>

                <DataBox title="Data Period">
                    <DataPeriodContainer periods={timeframes[selected.dataGroup] || [1]} />
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

DataMenu.propTypes = {
    selected: PropTypes.object,
    timeframes: PropTypes.object,
    setSelectedDataType: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
