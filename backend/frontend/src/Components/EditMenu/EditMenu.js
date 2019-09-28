import React from "react";
import classNames from "classnames";
import styles from "./EditMenu.module.scss";

import { connect } from "react-redux";
import {
    processDataFromStoreForHistogram,
    toggleDataMenu,
    removeColumnData,
    removeColumn,
    setSelectedColumn
} from "../../store/actions/actionCreators";

const EditMenu = props => {
    let classes = classNames({
        [styles.editMenu]: true,
        [styles.showMenu]: props.applyShowMenuClasses,
        [styles.hideMenu]: props.applyHideMenuClasses
    });

    const handleOpenDataMenu = columnName => {
        props.processDataFromStoreForHistogram(columnName);
        props.setSelectedColumn(columnName);
        //  props.setSelectedTimeframe(columnName);
        props.toggleDataMenu(columnName);
        props.toggleEditMenu();
    };

    const handleRemoveColumn = (columnName, columnIndex) => {
        props.removeColumnData(columnName);
        props.removeColumn(columnIndex);
    };

    return (
        <div className={classes}>
            <button className={styles.button} onClick={() => handleOpenDataMenu(props.column_name)}>
                Edit
            </button>
            <button className={styles.button} onClick={() => handleRemoveColumn(props.column_name, props.columnIndex)}>
                Delete
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        toggleDataMenu: columnName => dispatch(toggleDataMenu(columnName)),
        setSelectedColumn: columnName => dispatch(setSelectedColumn(columnName)),
        // setSelectedTimeframe: current_column_name => dispatch(setSelectedTimeframe(current_column_name)),
        processDataFromStoreForHistogram: columnName => dispatch(processDataFromStoreForHistogram(columnName)),
        removeColumnData: columnName => dispatch(removeColumnData(columnName)),
        removeColumn: columnIndex => dispatch(removeColumn(columnIndex))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditMenu);
