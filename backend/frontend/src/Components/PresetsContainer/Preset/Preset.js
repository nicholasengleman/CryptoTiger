import React, {Component} from "react";
import styles from "./Preset.module.scss";

class Preset extends Component {

    render() {
        return (
            <div className={styles.Preset}>
                <h2>1 Hour</h2>
                <h3>30 Saves</h3>
            </div>
        )
    }
}


export default Preset;
