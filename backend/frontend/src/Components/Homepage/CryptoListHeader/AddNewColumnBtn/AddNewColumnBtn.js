import React from "react";
import styles from "./AddNewColumnBtn.module.scss";
import {toggleDataMenu} from "../../../../store/actions/actionCreators";
import {connect} from "react-redux";


const AddNewColumnBtn = props => {
    return (
        <button
            className={styles.btn_add_new}
            onClick={() => props.onToggleDataMenu()}
        >
            Add
        </button>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleDataMenu: () => dispatch(toggleDataMenu())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AddNewColumnBtn);
