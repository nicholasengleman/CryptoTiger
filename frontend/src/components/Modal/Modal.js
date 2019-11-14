import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
import OutsideAlerter from "./../OutsideAlerter/OutsideAlerter";
import { connect } from "react-redux";

import {
    closeDataMenu,
    removeSelectedColumnId,
} from "../../store/actions/actionCreators";

class Modal extends React.Component {
    static getDerivedStateFromProps = nextProps => {
        if (nextProps.dataMenu.open) {
            document.body.classList.add("MODAL_OPEN_CLASS");
        }
    };

    handleClose = () => {
        console.log("clicked");
        this.props.closeDataMenu();
        this.props.removeSelectedColumnId();
    };

    render() {
        return (
            <div className={`modalOverlay ${this.props.dataMenu.open ? "modal-open" : ""}`} onClick={this.handleClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>{this.props.children}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeDataMenu: () => dispatch(closeDataMenu()),
        removeSelectedColumnId: () => dispatch(removeSelectedColumnId())
    };
};

Modal.propTypes = {
    dataMenu: PropTypes.object
};

export default connect(null, mapDispatchToProps)(Modal);
