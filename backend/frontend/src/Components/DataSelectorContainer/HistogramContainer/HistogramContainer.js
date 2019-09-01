import React, {Component} from "react";
import {connect} from "react-redux";

import styles from "./HistogramContainer.module.scss";
import Histogram from "./Histogram/Histogram";
import { css} from '@emotion/core'

import {ClipLoader} from "react-spinners";

import {addFilterParameter} from "../../../store/actions/actionCreators";

const override = css`
    position: absolute;
    top: 50px;
    left: calc(50% - 30px);
`;

class HistogramContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterParameters: {}
        };
    }

    handleFilterParametersChange = filterParameters =>
        this.setState({filterParameters});

    handleAddWithFilter = () => {
        this.props.addFilterParameter(this.state.filterParameters);
    };

    handleSetBoundries = (boundries) => {
        this.setState({ filterParameters: boundries});
    };

    render() {
        return (
            <div className={styles.HistogramContainer}>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#123abc'}
                    loading={(!Array.isArray(this.props.histogramData) || !this.props.histogramData.length) ? true : false} />
                <Histogram
                    data={this.props.histogramData.length > 0 ? this.props.histogramData : [1]}
                    getBoundries={this.handleSetBoundries}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        histogramData: state.cryptoData.histogramData,
        dataMenu: state.dataMenu.dataMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFilterParameter: filterParameters =>
            dispatch(addFilterParameter(filterParameters))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistogramContainer);
