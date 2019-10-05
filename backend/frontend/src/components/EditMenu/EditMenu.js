import React from "react";
import classNames from "classnames";
import styles from "./EditMenu.module.scss";

import { connect } from "react-redux";
import {
    processDataFromStoreForHistogram,
    toggleDataMenu,
    removeColumnData,
    removeColumn,
    removeFilter,
    setSelectedColumnId,
    setSelectedDataName,
    setSelectedDataPeriod
} from "../../store/actions/actionCreators";

const EditMenu = props => {
    let classes = classNames({
        [styles.editMenu]: true,
        [styles.showMenu]: props.applyShowMenuClasses,
        [styles.hideMenu]: props.applyHideMenuClasses
    });

    const handleOpenDataMenu = (columnName, columnId) => {
        props.processDataFromStoreForHistogram(columnName);
        props.setSelectedDataName(columnName);
        props.setSelectedDataPeriod(null, columnId);
        props.setSelectedColumnId(columnId);
        props.toggleDataMenu(columnName);
        props.toggleEditMenu();
    };

    const handleRemoveColumn = (columnId, columnIndex) => {
        props.removeColumnData(columnId);
        props.removeColumn(columnIndex);
        props.removeFilter(columnId);
        props.toggleEditMenu();
    };

    return (
        <div className={classes}>
            <button className={styles.button} onClick={() => handleOpenDataMenu(props.columnName, props.columnId)}>
                Edit
            </button>
            <button className={styles.button} onClick={() => handleRemoveColumn(props.columnId, props.columnIndex)}>
                Delete
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDataMenu: columnName => dispatch(toggleDataMenu(columnName)),
        setSelectedDataName: columnName => dispatch(setSelectedDataName(columnName)),
        setSelectedDataPeriod: (dataPeriod, columnId) => dispatch(setSelectedDataPeriod(dataPeriod, columnId)),
        setSelectedColumnId: columnId => dispatch(setSelectedColumnId(columnId)),
        processDataFromStoreForHistogram: columnName => dispatch(processDataFromStoreForHistogram(columnName)),
        removeColumnData: columnName => dispatch(removeColumnData(columnName)),
        removeColumn: columnIndex => dispatch(removeColumn(columnIndex)),
        removeFilter: columnId => dispatch(removeFilter(columnId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditMenu);
