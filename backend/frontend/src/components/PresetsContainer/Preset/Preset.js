import React, { Component } from "react";
import styles from "./Preset.module.scss";
import axios from "axios";
import iconLedger from "./../../../img/icon_ledger.png";
import icon_ledger from "./../../../img/icon_ledger.png";
import icon_heart from "./../../../img/icon_heart.png";
import Bar from "./../../Bar/Bar";

class Preset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subThumbnails: [],
            subsTotal: Math.floor(Math.random() * (99 - 6 + 1)) + 6
        };
    }
    componentDidMount() {
        let subThumbnails = [];

        axios
            .get("https://randomuser.me/api/?results=5")
            .then(response => {
                if (response.data.results) {
                    response.data.results.forEach(sub => {
                        subThumbnails.push(sub.picture.thumbnail);
                    });
                    this.setState({ subThumbnails });
                }
            })
            .catch(error => {
                console.log("[Error]: ", error);
            });
    }

    render() {
        return (
            <div className={styles.preset}>
                <div className={styles.header}>
                    <img className={styles.icon} src={icon_ledger} alt="" />
                    <div>
                        <div className={styles.title}>CryptoTiger</div>
                        {/* <div className={styles.number}></div> */}
                    </div>
                </div>

                <div class={styles.rating}>
                    <span className={styles.ratingNumber}>3.5 Rating</span>
                    <Bar percentage="20%" />
                    <div className={styles.heartButton}>
                        <img className={styles.heartIcon} src={icon_heart} alt="" />
                    </div>
                </div>

                <div className={styles.sectionTitle}>Columns</div>

                <div className={styles.filtersContainer}>
                    <div className={styles.column}>1 hr</div>
                    <div className={styles.column}>
                        4 hr<span className={styles.filter}>(3% to 12%)</span>
                    </div>
                </div>

                <div className={styles.sectionTitle}>Subscribers</div>
                <div className={styles.subscriberContainer}>
                    {this.state.subThumbnails.map((sub, i) => {
                        if (i < this.state.subThumbnails.length - 1) {
                            return (
                                <div key={i} className={styles.subThumbnail}>
                                    <img src={sub} alt="" />
                                </div>
                            );
                        }
                    })}

                    <div className={styles.subThumbnail}>
                        <img
                            className={styles.tint}
                            src={this.state.subThumbnails[this.state.subThumbnails.length - 1]}
                            alt=""
                        />
                        <div className={styles.subsRemaining}>+{this.state.subsTotal - 5}</div>
                    </div>

                    <div className={styles.subsTotal}>{this.state.subsTotal} Subs to Preset</div>
                </div>
                <button className={styles.applyPresetBtn}>Apply Preset</button>
            </div>
        );
    }
}

export default Preset;
