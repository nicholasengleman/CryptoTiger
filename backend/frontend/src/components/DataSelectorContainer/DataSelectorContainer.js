import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "../DataSelector/DataSelector";
import HistogramContainer from "../HistogramContainer/HistogramContainer";
import {
    addFilter,
    editFilter,
    closeDataMenu,
    addColumn,
    addColumnData,
    editColumnData,
    removeSelectedColumnId,
    moveCryptoBufferToData
} from "../../store/actions/actionCreators";

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

    handleClose = () => {
        this.props.closeDataMenu();
        this.props.removeSelectedColumnId();
    };

    handleSave = () => {
        this.props.addColumnData();

        if (this.props.selectedData.selectedColumnId === 0) {
            this.props.addColumn();
        }

        if (this.props.selectedData.selectedColumnId !== 0) {
            this.props.editColumnData();
        }

        if (this.state.filterParameters.selectionMax) {
            if (this.props.filterData.filterParameters.length === 0) {
                this.props.moveCryptoBufferToData();
                this.props.addFilter(this.props.selectedData.selectedColumnId, this.state.filterParameters);
            }
            if (this.props.filterData.filterParameters.length > 0) {
                let indexOfFilter = this.props.filterData.filterParameters.findIndex(filter => {
                    return filter.columnId === this.props.selectedData.selectedColumnId;
                });
                if (indexOfFilter === -1) {
                    this.props.moveCryptoBufferToData();
                    this.props.addFilter(this.props.selectedData.selectedColumnId, this.state.filterParameters);
                } else {
                    this.props.moveCryptoBufferToData();
                    this.props.editFilter(this.props.selectedData.selectedColumnId, this.state.filterParameters);
                }
            }
        }

        this.handleClose();
    };

    render() {
        return (
            <div className={classNames(this.props.dataMenu.open ? styles.open : styles.closed)}>
                <DataSelector />
                <HistogramContainer handleSetBoundries={this.handleSetBoundries} />
                <div className={styles.btnContainer}>
                    <Button onClick={() => this.handleClose()} name="Cancel" />
                    <Button onClick={this.handleSave} name="Save" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataMenu: state.dataMenu.dataMenu,
        cryptoData: state.cryptoData,
        filterData: state.filterData,
        selectedData: state.selectedData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeDataMenu: () => dispatch(closeDataMenu()),
        addFilter: (filterParameters, periodName) => dispatch(addFilter(filterParameters, periodName)),
        editFilter: (filterParameters, periodName) => dispatch(editFilter(filterParameters, periodName)),
        addColumn: () => dispatch(addColumn()),
        addColumnData: () => dispatch(addColumnData()),
        editColumnData: () => dispatch(editColumnData()),
        moveCryptoBufferToData: () => dispatch(moveCryptoBufferToData()),
        removeSelectedColumnId: () => dispatch(removeSelectedColumnId())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSelectorContainer);
