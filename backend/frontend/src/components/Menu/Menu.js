import React from "react";

import classNames from "classnames";
import styles from "./Menu.module.scss";

import { connect } from "react-redux";
import {
    processDataFromStoreForHistogram,
    toggleDataMenu,
    removeColumnData,
    removeColumn,
    removeFilter,
    setSelectedColumnId,
    setSelectedDataType,
    setSelectedDataGroup,
    setSelectedDataPeriod,
    setSelectedDataName
} from "../../store/actions/actionCreators";

const Menu = props => {
    let classes = classNames({
        [styles.editMenu]: true,
        [styles.showMenu]: props.applyShowMenuClasses,
        [styles.hideMenu]: props.applyHideMenuClasses
    });

    const handleOpenDataMenu = (columnType, columnGroup, columnPeriod, columnName, columnId) => {
        props.processDataFromStoreForHistogram(columnName);
        props.setSelectedDataType(columnType);
        props.setSelectedDataGroup(columnGroup);
        props.setSelectedDataPeriod(columnPeriod);
        props.setSelectedDataName(columnName);
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
            <button
                className={styles.button}
                onClick={() =>
                    handleOpenDataMenu(
                        props.columnType,
                        props.columnGroup,
                        props.columnPeriod,
                        props.columnName,
                        props.columnId
                    )
                }
            >
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
        setSelectedDataType: dataType => dispatch(setSelectedDataType(dataType)),
        setSelectedDataGroup: dataGroup => dispatch(setSelectedDataGroup(dataGroup)),
        setSelectedDataPeriod: dataPeriod => dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: columnName => dispatch(setSelectedDataName(columnName)),
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
)(Menu);
