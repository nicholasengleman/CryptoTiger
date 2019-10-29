import React from "react";
import PropTypes from "prop-types";
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

const Menu = ({
    applyShowMenuClasses,
    applyHideMenuClasses,
    processDataFromStoreForHistogram,
    setSelectedDataType,
    setSelectedDataGroup,
    setSelectedDataPeriod,
    setSelectedDataName,
    setSelectedColumnId,
    toggleDataMenu,
    toggleEditMenu,
    removeColumnData,
    removeColumn,
    columnType,
    columnGroup,
    columnPeriod,
    columnName,
    columnId,
    columnIndex,
    removeFilter
}) => {
    let classes = classNames({
        [styles.editMenu]: true,
        [styles.showMenu]: applyShowMenuClasses,
        [styles.hideMenu]: applyHideMenuClasses
    });

    const handleOpenDataMenu = (columnType, columnGroup, columnPeriod, columnName, columnId) => {
        processDataFromStoreForHistogram(columnName);
        setSelectedDataType(columnType);
        setSelectedDataGroup(columnGroup);
        setSelectedDataPeriod(columnPeriod);
        setSelectedDataName(columnName);
        setSelectedColumnId(columnId);
        toggleDataMenu(columnName);
        toggleEditMenu();
    };

    const handleRemoveColumn = (columnId, columnIndex) => {
        removeColumnData(columnId);
        removeColumn(columnIndex);
        removeFilter(columnId);
        toggleEditMenu();
    };

    return (
        <div className={classes}>
            <button
                className={styles.button}
                onClick={() => handleOpenDataMenu(columnType, columnGroup, columnPeriod, columnName, columnId)}
            >
                Edit
            </button>
            <button className={styles.button} onClick={() => handleRemoveColumn(columnId, columnIndex)}>
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

Menu.propTypes = {
    applyShowMenuClasses: PropTypes.bool,
    applyHideMenuClasses: PropTypes.bool,
    processDataFromStoreForHistogram: PropTypes.func,
    setSelectedDataType: PropTypes.func,
    setSelectedDataGroup: PropTypes.func,
    setSelectedDataPeriod: PropTypes.func,
    setSelectedDataName: PropTypes.func,
    setSelectedColumnId: PropTypes.func,
    toggleDataMenu: PropTypes.func,
    toggleEditMenu: PropTypes.func,
    removeColumnData: PropTypes.func,
    removeColumn: PropTypes.func,
    columnType: PropTypes.string,
    columnGroup: PropTypes.string,
    columnPeriod: PropTypes.number,
    columnName: PropTypes.string,
    columnId: PropTypes.number,
    columnIndex: PropTypes.number,
    removeFilter: PropTypes.func
};

export default connect(
    null,
    mapDispatchToProps
)(Menu);
