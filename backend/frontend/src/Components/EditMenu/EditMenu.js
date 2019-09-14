import React from "react";
import classNames from "classnames";
import styles from "./EditMenu.module.scss";

import { connect } from "react-redux";
import { processDataFromStoreForHistogram, setSelectedColumn, setSelectedTimeframe, toggleDataMenu, removeCrypto } from "../../store/actions/actionCreators";

const EditMenu = props => {
    let classes = classNames({
        [styles.editMenu]: true,
        [styles.showMenu]: props.applyShowMenuClasses,
        [styles.hideMenu]: props.applyHideMenuClasses
    });

    const handleOpenDataMenu = columnName => {
        props.processDataFromStoreForHistogram(columnName);
        props.setSelectedColumn(columnName);
        props.setSelectedTimeframe(columnName);
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
        toggleDataMenu: current_column_name => dispatch(toggleDataMenu(current_column_name)),
        setSelectedColumn: current_column_name => dispatch(setSelectedColumn(current_column_name)),
        setSelectedTimeframe: current_column_name => dispatch(setSelectedTimeframe(current_column_name)),
        processDataFromStoreForHistogram: current_column_name => dispatch(processDataFromStoreForHistogram(current_column_name)),
        removeCrypto: current_column_name => dispatch(removeCrypto(current_column_name))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditMenu);
