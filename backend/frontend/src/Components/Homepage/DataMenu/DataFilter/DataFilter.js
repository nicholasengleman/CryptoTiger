import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./DataFilter.module.scss";
import HistogramSlider from "./Histogram/Histogram";

class DataFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "in-between"
        };
    }

    handleFilterTypeChange = e => {
        this.setState({ value: e.value });
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    Filter this data?
                    <span>X</span>
                </div>
                <div className={styles.body}>
                    <HistogramSlider data={this.props.histogramData} barMargin={3} />
                </div>
                <div className={styles.footer}>
                    <button className={styles.addFilter}>Add Filter</button>
                    <button className={styles.addFilter} onClick={this.props.handleAddWithoutFilter}>
                        Add Without Filter
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        histogramData: state.cryptoData.histogramData
    };
};

export default connect(mapStateToProps)(DataFilter);
