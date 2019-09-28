import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "../DataSelector/DataSelector";
import HistogramContainer from "../HistogramContainer/HistogramContainer";
import { addFilter, closeDataMenu, addColumn } from "../../store/actions/actionCreators";

import Button from "./../Button/Button";

//import PresetsContainer from "./PresetsContainer/PresetsContainer";

class DataSelectorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterParameters: {}
        };
    }

    handleSetBoundries = boundries => {
        this.setState({ filterParameters: boundries });
    };

    handleAdd = () => {
        if (Object.keys(this.state.filterParameters).length > 0) {
            this.props.addFilter(this.state.filterParameters);
        } else {
            this.props.addFilter();
        }

        if (this.props.selectedColumn === "") {
            this.props.addColumn();
        }

        this.props.closeDataMenu();
    };

    render() {
        return (
            <div className={classNames(this.props.dataMenu.open ? styles.open : styles.closed)}>
                <DataSelector />
                <HistogramContainer handleSetBoundries={this.handleSetBoundries} />
                <div className={styles.btnContainer}>
                    <Button onClick={() => this.props.closeDataMenu()} name="Cancel" />
                    <Button onClick={this.handleAdd} name="Save" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataMenu: state.dataMenu.dataMenu,
        selectedColumn: state.cryptoData.selectedColumn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeDataMenu: () => dispatch(closeDataMenu()),
        addFilter: (filterParameters, periodName) => dispatch(addFilter(filterParameters, periodName)),
        addColumn: () => dispatch(addColumn())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSelectorContainer);
