import React, { Component } from "react";
import styles from "./Preset.module.scss";

class Preset extends Component {
    render() {
        return (
            <div className={styles.Preset}>
                <div className="title">CryptoTiger</div>
                <div class="rating">
                    <span>3.5 Rating</span>
                    <span></span>
                    <span className="heart"></span>
                </div>
                <div className="filterContainer">
                    <button className="filter"></button>
                </div>
                <div className="subscribers">
                    <div className="subscriber"></div>
                    <span>20 Clients in the list</span>
                </div>
                <button>Apply This Preset</button>
            </div>
        );
    }
}

export default Preset;
