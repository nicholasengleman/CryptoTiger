import React, {Component} from "react";
import styles from "./DataMenu.module.scss";
import classNames from "classnames";

import {connect} from "react-redux";
import {
    changeColumnData,
    closeDataMenu
} from "../../../store/actions/actionCreators";

import DataPeriod from "./DataPeriod/DataPeriod";
import DataFilter from "./DataFilter/DataFilter";

class DataMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDataType: "price",
            selectedDataID: "",
            selectedDataName: ""
        };
    }


    handleSetDataType = event => {
        this.setState({selectedDataID: event.currentTarget.textContent});

    };


    handleFilterTypeChange = e => {
        let filter = {...this.state.filter};
        filter.value = e.value;
        this.setState({filter});
    };

    handleFilterNumberChange = e => {
        let filter = {...this.state.filter};
        filter[e.target.id] = e.target.value;
        this.setState({filter});
    };

    handleAddWithoutFilter = () => {
        this.props.onAddWithoutFilter(this.state.selectedDataID, this.state.selectedDataName);
        this.props.closeDataMenu();
        this.setState({selectedDataID: ""});
    };

    render() {

        //renders all the above above components
        return (
            <div className={styles.dataMenuContainer}>
                <div
                    className={classNames(
                        styles.dataContainer,
                        this.props.dataMenu.open ? styles.open : styles.closed
                    )}
                >
                    <div className={styles.dataTypeWindow}>
                        <div className={classNames(
                            styles.dataType,
                            this.state.selectedDataType === "price"
                                ? styles.dataTypeSelected
                                : null
                        )}
                             onClick={this.handleSetDataType}
                        >
                            <p>Price</p>
                        </div>
                    </div>
                    <div className={styles.dataPeriodsWindow}>

                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Hour</div>
                            {Array.from({length: this.props.dataMenu.timeframes.hours}, (v, k) => k + 1).map(function (period) {
                                const timeframe_description = period === 1 ? " Hour" : " Hours";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedPeriod={this.state.selectedDataID}
                                        period_time={period * 60 * 60}
                                        period_name={period + timeframe_description}
                                        handleSetDataType={this.handleSetDataType}
                                    />
                                );
                            }, this)}
                        </div>

                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Day</div>
                            {Array.from({length: this.props.dataMenu.timeframes.days}, (v, k) => k + 1).map(function (period) {
                                const timeframe_description = period === 1 ? " Day" : " Days";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedPeriod={this.state.selectedDataID}
                                        period_time={period * 60 * 60 * 24}
                                        period_name={period + timeframe_description}
                                        handleSetDataType={this.handleSetDataType}
                                    />
                                );
                            }, this)}
                        </div>

                        <div className={styles.dataPeriodType}>
                            <div className={styles.dataPeriodTypeHeader}>Weeks</div>
                            {Array.from({length: this.props.dataMenu.timeframes.weeks}, (v, k) => k + 1).map(function (period) {
                                const timeframe_description = period === 1 ? " Week" : " Weeks";
                                return (
                                    <DataPeriod
                                        key={period}
                                        selectedPeriod={this.state.selectedDataID}
                                        period_time={period * 60 * 60 * 24 * 7}
                                        period_name={period + timeframe_description}
                                        handleSetDataType={this.handleSetDataType}
                                    />
                                );
                            }, this)}
                        </div>

                    </div>
                </div>
                {this.state.selectedDataID && (
                    <DataFilter
                        handleFilterTypeChange={this.handleFilterTypeChange}
                        handleFilterNumberChange={this.handleFilterNumberChange}
                        handleAddWithoutFilter={this.handleAddWithoutFilter}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataMenu: state.dataMenu.dataMenu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddWithoutFilter: (data_id, data_name) => dispatch(changeColumnData(data_id, data_name)),
        closeDataMenu: () => dispatch(closeDataMenu())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataMenu);
