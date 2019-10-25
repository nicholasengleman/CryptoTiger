import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./PresetsContainer.module.scss";
import Preset from "./Preset/Preset";

class PresetsContainer extends Component {
    render() {
        return (
            <div className={styles.presetsSection}>
                <div className={styles.presetsContainer}>
                    {this.props.presetData.map(preset => (
                        <Preset name={preset.name} rating={preset.rating} columns={preset.columns} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        presetData: state.presetsData.presets
    };
};

export default connect(mapStateToProps)(PresetsContainer);
