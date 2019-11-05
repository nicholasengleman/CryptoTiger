import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

class Modal extends React.Component {
    static getDerivedStateFromProps = nextProps => {
        if (nextProps.dataMenu.open) {
            document.body.classList.add("MODAL_OPEN_CLASS");
        }
    };

    render() {
        return (
            <div className={`modalOverlay ${this.props.dataMenu.open ? "modal-open" : ""}`}>
                <div className="modal">{this.props.children}</div>
            </div>
        );
    }
}

Modal.propTypes = {
    dataMenu: PropTypes.object
};

export default Modal;
