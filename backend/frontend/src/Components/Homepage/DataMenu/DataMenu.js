import React, {Component} from "react";
import axios from "axios";
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

    componentDidMount() {
        axios
            .get("http://localhost:5000/api/getdataobject")
            .then(response => {
                // this.props.CryptosSuccess(response.data);
                // this.props.loadInitialColData(response.data);
                //  this.setState({ dataObject: response.data.Data });
                this.setState({dataInfo: response.data});
            })
            .catch(error => {
                // this.props.CryptosFailure(error);
                console.log("[Error]", error);
            });
    }

    handleSetDataType = event => {
        this.setState({selectedDataType: event.currentTarget.textContent});
    };

    handleSetDataID = (data_id, data_name) => {
        this.setState({selectedDataID: data_id, selectedDataName: data_name });
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
        //creates the left sidebar component: "Price, Volumne, etc"
        let data_types = this.state.dataInfo && Object.keys(this.state.dataInfo).map(function (data) {
            return (
                <div
                    className={classNames(
                        styles.dataType,
                        this.state.selectedDataType === data
                            ? styles.dataTypeSelected
                            : null
                    )}
                    onClick={this.handleSetDataType}
                    key={data}
                >
                    <p>{data}</p>
                </div>
            );
        }, this);

        //creates the time frame type components (hourly, daily, etc) and then the individual time frames(5min, 1hr,
        // etc) inside each component
        let data_period_types = this.state.dataInfo && Object.keys(this.state.dataInfo[this.state.selectedDataType]).map(function (data, i) {
            if (i > 0) {
                return (
                    <div className={styles.dataPeriodType} key={data}>
                        <div className={styles.dataPeriodTypeHeader}>{data}</div>
                        {Object.keys(this.state.dataInfo[this.state.selectedDataType][data]).map(function (period) {
                            let period_data = this.state.dataInfo[this.state.selectedDataType][data][period];
                            return (
                                <DataPeriod
                                    key={period_data.data_id}
                                    selectedPeriod={this.state.selectedDataID}
                                    period_name={period_data.data_name}
                                    data_id={period_data.data_id}
                                    setDataID={this.handleSetDataID}
                                />
                            );
                        }, this)}
                    </div>
                );
            }
        }, this);
        
        //renders all the above above components
        return (
            <div className={styles.dataMenuContainer}>
                <div
                    className={classNames(
                        styles.dataContainer,
                        this.props.dataMenu.open ? styles.open : styles.closed
                    )}
                >
                    <div className={styles.dataTypeWindow}>{data_types}</div>
                    <div className={styles.dataPeriodsWindow}>{data_period_types}</div>
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
        periodData: state.dataMenu.columns
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
