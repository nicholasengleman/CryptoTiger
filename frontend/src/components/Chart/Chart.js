import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Chart.module.scss";

import Histogram from "../DataSelectorModal/HistogramContainer/Histogram/Histogram";
import selectHomeChartCryptos from "../../store/selectors/selectHomeChartCryptos";

class Box extends Component {
    render() {
        return (
            <div className={styles.chart}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            Last 60 Minute Price Change
                        </div>
                        <span className={styles.instructions}>
                            Hover over each bar to see the crypto and its
                            change.
                        </span>
                    </div>
                </div>
                <Histogram
                    data={
                        this.props.histogramData.length > 0
                            ? this.props.histogramData
                            : [1]
                    }
                    showSlider={false}
                    showInputs={false}
                />
                <div />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        histogramData: selectHomeChartCryptos(state)
    };
};

export default connect(mapStateToProps)(Box);
