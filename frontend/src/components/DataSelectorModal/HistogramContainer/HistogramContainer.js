import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./HistogramContainer.module.scss";
import Histogram from "./Histogram/Histogram";
import { css } from "@emotion/core";

import { ClipLoader } from "react-spinners";
import selectHistogramCryptos from "../../../store/selectors/selectHistogramCryptos";

const override = css`
    position: absolute;
    top: 50px;
    left: calc(50% - 30px);
`;

class HistogramContainer extends Component {
    findFilter = columnId => {
        let results = this.props.filterParameters.find(filter => {
            return filter.columnId === columnId;
        });
        if (results) {
            return results.parameters;
        }
    };

    render() {
        const {
            histogramData,
            handleSetBoundries,
            selectedColumnId
        } = this.props;
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
                        histogramData.length > 0
                            ? this.props.histogramData
                            : [1]
                    }
                    getBoundries={handleSetBoundries}
                    buttonPresets={this.findFilter(selectedColumnId)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        histogramData: selectHistogramCryptos(state),
        filterParameters: state.filterData.filterParameters,
        selectedColumnId: state.selectedData.selectedColumnId,
        dataMenu: state.dataMenu.dataMenu
    };
};

HistogramContainer.propTypes = {
    histogramData: PropTypes.array,
    handleSetBoundries: PropTypes.func,
    selectedColumnId: PropTypes.number
};

export default connect(mapStateToProps)(HistogramContainer);
