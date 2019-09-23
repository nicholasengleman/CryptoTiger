import React from "react";
import classNames from "classnames";
import styles from "./EditMenu.module.scss";

import { connect } from "react-redux";
import {
    processDataFromStoreForHistogram,
    toggleDataMenu,
    removeCrypto,
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

    const handleRemoveCrypto = columnName => {
        props.removeCrypto(columnName);
    };

    return (
        <div className={classes}>
            <button className={styles.button} onClick={() => handleOpenDataMenu(props.column_name)}>
                Edit
            </button>
            <button className={styles.button} onClick={() => handleRemoveCrypto(props.column_name)}>
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
        removeCrypto: columnName => dispatch(removeCrypto(columnName))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditMenu);
