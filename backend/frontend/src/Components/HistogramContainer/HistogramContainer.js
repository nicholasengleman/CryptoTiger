import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./HistogramContainer.module.scss";
import Histogram from "../Histogram/Histogram";
import { css } from "@emotion/core";

import { ClipLoader } from "react-spinners";

const override = css`
    position: absolute;
    top: 50px;
    left: calc(50% - 30px);
`;

class HistogramContainer extends Component {
    findFilter = timeframe_name => {
        return this.props.filterParameters.find(filter => {
            return filter.column === timeframe_name;
        });
    };

    render() {
        return (
            <div className={styles.HistogramContainer}>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={"#123abc"}
                    loading={
                        !Array.isArray(this.props.histogramData) ||
                        !this.props.histogramData.length
                            ? true
                            : false
                    }
                />
                <Histogram
                    data={
                        this.props.histogramData.length > 0
                            ? this.props.histogramData
                            : [1]
                    }
                    getBoundries={this.props.handleSetBoundries}
                    buttonPresets={this.findFilter(this.props.selectedColumn)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        histogramData: state.cryptoData.histogramData,
        filterParameters: state.cryptoData.filterParameters,
        selectedColumn: state.cryptoData.selectedColumn,
        dataMenu: state.dataMenu.dataMenu
    };
};

export default connect(mapStateToProps)(HistogramContainer);
