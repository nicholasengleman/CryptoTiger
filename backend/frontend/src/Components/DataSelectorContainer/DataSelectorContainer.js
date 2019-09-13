import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "../DataSelector/DataSelector";
import HistogramContainer from "../HistogramContainer/HistogramContainer";
import { addCrypto, closeDataMenu } from "../../store/actions/actionCreators";

//import PresetsContainer from "./PresetsContainer/PresetsContainer";

class DataSelectorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterParameters: {}
        };
    }

    handleSetBoundries = boundries => {
        this.setState({ filterParameters: boundries });
    };

    handleAddCrypto = () => {
        this.props.addCrypto(this.state.filterParameters);
        this.props.closeDataMenu();
    };

    render() {
        return (
            <div className={classNames(this.props.dataMenu.open ? styles.open : styles.closed)}>
                <DataSelector />
                <HistogramContainer handleSetBoundries={this.handleSetBoundries} />
                <div className={styles.btnContainer}>
                    <button className="btn" onClick={() => this.props.closeDataMenu()}>
                        Cancel
                    </button>
                    <button onClick={this.handleAddCrypto} className="btn">
                        Add Crypto
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataMenu: state.dataMenu.dataMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeDataMenu: () => dispatch(closeDataMenu()),
        addCrypto: (filterParameters, periodName) => dispatch(addCrypto(filterParameters, periodName))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSelectorContainer);
