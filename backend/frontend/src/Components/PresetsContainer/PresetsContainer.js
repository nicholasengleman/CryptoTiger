import React, { Component } from "react";
import styles from "./PresetsContainer.module.scss";
import Preset from "../Preset/Preset";

class PresetsContainer extends Component {

    render() {
        return (
            <div className={styles.presetsSection}>
                <h2>Select a Preset</h2>
                <div className={styles.presetsContainer}>
                    <Preset />
                </div>
            </div>
        )
    }
}

export default PresetsContainer;
