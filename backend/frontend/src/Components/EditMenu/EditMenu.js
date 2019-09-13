import React from "react";
import classNames from "classnames";
import styles from "./EditMenu.module.scss";

import { connect } from "react-redux";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {toggleDataMenu} from "../../store/actions/actionCreators";


const EditMenu = (props) => {

    let classes = classNames({
        [styles.editMenu] : true,
        [styles.showMenu] : props.applyShowMenuClasses,
        [styles.hideMenu] : props.applyHideMenuClasses
    });

     //onClick={() => this.onToggleDataMenu(this.props.column_name)}

    return (
        <div className={classes}>
            <button className={styles.button}>Edit</button>
            <button className={styles.button}>Delete</button>
        </div>
    )
};

const mapDispatchToProps = dispach => {
    return (
        toggleDataMenu: current_column_name => dispatch(toggleDataMenu(current_column_name))
    )
};

export default connect(
    null,
    mapDispatchToProps
)(EditMenu);