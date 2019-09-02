import React, {Component} from "react";
import "./CryptoHeader.scss";
import {connect} from "react-redux";
import { processDataFromStoreForHistogram, toggleDataMenu} from "../../../../store/actions/actionCreators";

class CryptoHeader extends Component {

    onToggleDataMenu = columnName => {
        this.props.processDataFromStoreForHistogram(columnName);
        this.props.toggleDataMenu(columnName);
    };


    render() {
        return (
            <div
                onClick={() => this.onToggleDataMenu(this.props.column_name)}
                className="column"
            >
                {this.props.filter
                    ? <div className="filter-description">only showing {parseInt(this.props.filter.parameters.selectionMin)}% to {parseInt(this.props.filter.parameters.selectionMax)}%</div>
                    : <div className="filter-description"></div>}
                <div className="column-name">
                {this.props.column_name}
                {this.props.column_name !== "Current Price" ? <i className="far fa-edit"></i> : null}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDataMenu: (current_column_name) => dispatch(toggleDataMenu(current_column_name)),
        processDataFromStoreForHistogram: (current_column_name) => dispatch(processDataFromStoreForHistogram(current_column_name))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CryptoHeader);
