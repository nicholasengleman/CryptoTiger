import React, {Component} from "react";
import {connect} from "react-redux";
import classNames from "classnames";
import styles from "./DataSelectorContainer.module.scss";

import DataSelector from "./DataSelector/DataSelector";
import HistogramContainer from "./HistogramContainer/HistogramContainer";
import {addFilter} from "../../store/actions/actionCreators";

//import PresetsContainer from "./PresetsContainer/PresetsContainer";

class DataSelectorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterPeriod: "",
            filterParameters: {}
        };
    }

    handleAddFilter = () => {
        this.props.addFilter(this.state.filterParameters, this.state.filterPeriod);
    };

    handleSetFilterPeriod = (filterPeriod, filterName) => {
        let name = filterName.charAt(0).toUpperCase() + filterName.slice(1);
        this.setState({ filterPeriod: `${filterPeriod} ${name}`});
    };

    handleSetBoundries = (boundries) => {
        this.setState({filterParameters: boundries});
    };

    render() {
        return (
            <div
                className={classNames(
                    this.props.dataMenu.open ? styles.open : styles.closed
                )}
            >
                <DataSelector handleSetFilterPeriod={this.handleSetFilterPeriod}/>
                <HistogramContainer handleSetBoundries={this.handleSetBoundries}/>
                <div className={styles.btnContainer}>
                    <button className="btn">Cancel</button>
                    <button onClick={this.handleAddFilter} className="btn">Apply</button>
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
    addFilter: (filterParameters, periodName) =>
        dispatch(addFilter(filterParameters, periodName ))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DataSelectorContainer);
