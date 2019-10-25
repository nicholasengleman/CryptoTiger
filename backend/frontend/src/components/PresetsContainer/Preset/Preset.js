import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Preset.module.scss";
import axios from "axios";
import icon_ledger from "./../../../img/icon_ledger.png";
import icon_heart from "./../../../img/icon_heart.png";
import Bar from "./../../Bar/Bar";

import { processNewColumnData, emptyData, emptyFilter, addFilter } from "../../../store/actions/actionCreators";

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

    onApplyPreset = () => {
        this.props.emptyData();
        this.props.emptyFilter();
        setTimeout(() => {
            this.props.columns.forEach(column => {
                axios
                    .get(`http://localhost:5000/api/crypto-data/getColumnData/${column.time}`)
                    .then(response => {
                        this.props.processNewColumnData(
                            response.data,
                            column.columnIndex,
                            false,
                            column.columnType,
                            column.columnGroup,
                            column.columnPeriod,
                            column.columnName
                        );
                        if (column.filter.length > 0) {
                            let filterParameters = {
                                selectionMin: column.filter[0],
                                selectionMax: column.filter[1]
                            };
                            this.props.addFilter(column.columnIndex, filterParameters);
                        }
                    })
                    .catch(error => {
                        console.log("[Error]: ", error);
                    });
            });
        }, 100);
    };

    render() {
        return (
            <div className={styles.preset}>
                <div className={styles.header}>
                    <img className={styles.icon} src={icon_ledger} alt="" />
                    <div>
                        <div className={styles.title}>{this.props.name}</div>
                    </div>
                </div>

                <div class={styles.rating}>
                    <span className={styles.ratingNumber}>{this.props.rating} Rating</span>
                    <Bar percentage={this.props.rating} />
                    <div className={styles.heartButton}>
                        <img className={styles.heartIcon} src={icon_heart} alt="" />
                    </div>
                </div>

                <div className={styles.sectionTitle}>Columns</div>

                <div className={styles.filtersContainer}>
                    {this.props.columns.map(column => (
                        <div className={styles.column}>{column.description}</div>
                    ))}
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
                <button className={styles.applyPresetBtn} onClick={() => this.onApplyPreset()}>
                    Apply Preset
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        emptyData: () => dispatch(emptyData()),
        emptyFilter: () => dispatch(emptyFilter()),
        addFilter: (columnId, filterParameters) => dispatch(addFilter(columnId, filterParameters)),
        processNewColumnData: (newColumnData, id, processForHistogram, dataType, dataGroup, dataPeriod, dataName) =>
            dispatch(
                processNewColumnData(newColumnData, id, processForHistogram, dataType, dataGroup, dataPeriod, dataName)
            )
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Preset);
