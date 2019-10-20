import React from "react";
import './Modal.scss';

const Modal = ({children, dataMenu}) => (
    <div className={`modalOverlay ${dataMenu.open ? "modal-open" : ""}`}>
        <div className='modal'>
            {children}
        </div>
    </div>
);

export default Modal;