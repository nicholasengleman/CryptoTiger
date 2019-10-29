import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./PresetsContainer.module.scss";
import Preset from "./Preset/Preset";

class PresetsContainer extends Component {
    render() {
        return (
            <div className={styles.presetsSection}>
                <div className={styles.presetsContainer}>
                    {this.props.presetData.map((preset, index) => (
                        <Preset key={index} name={preset.name} rating={preset.rating} columns={preset.columns} />
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

PresetsContainer.protoType = {
    presetData: PropTypes.array
};

export default connect(mapStateToProps)(PresetsContainer);
