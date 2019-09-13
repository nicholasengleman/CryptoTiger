import React, { Component } from "react";
import "./CryptoColumnHeader.scss";
import EditMenu from "./../EditMenu/EditMenu";
import { connect } from "react-redux";
import { processDataFromStoreForHistogram, setSelectedColumn, setSelectedTimeframe, toggleDataMenu } from "./../../store/actions/actionCreators";

class CryptoColumnHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyShowMenuClasses: false,
            applyHideMenuClasses: false
        }
    }

    onToggleDataMenu = columnName => {
        this.props.processDataFromStoreForHistogram(columnName);
        this.props.setSelectedColumn(columnName);
        this.props.setSelectedTimeframe(columnName);
        this.props.toggleDataMenu(columnName);
    };

    onToggleEditMenu = () => {
        if(!this.state.applyShowMenuClasses) {
            this.setState({applyShowMenuClasses: true });
        } else {
            this.setState(
                {
                    applyShowMenuClasses: false,
                    applyHideMenuClasses: true,
                }, () => {
                    let that = this;
                    window.setTimeout(function() {
                        that.setState({ applyHideMenuClasses: false})
                    }, 100);
                });
        }
    };

    render() {
        return (
            <div className="column">
                {this.props.filter && Object.entries(this.props.filter.parameters).length > 0 ? (
                    <div className="filter-description">
                        only showing {parseInt(this.props.filter.parameters.selectionMin)}% to {parseInt(this.props.filter.parameters.selectionMax)}%
                    </div>
                ) : (
                    <div className="filter-description"></div>
                )}


                {this.props.column_name !== "Current Price"
                    ?
                    <EditMenu
                        applyShowMenuClasses={this.state.applyShowMenuClasses}
                        applyHideMenuClasses={this.state.applyHideMenuClasses}
                    />
                    : null}
                <div className="column-name">
                    {this.props.column_name}
                    {this.props.column_name !== "Current Price" ? <i className="far fa-edit" onClick={() => this.onToggleEditMenu()}></i> : null}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDataMenu: current_column_name => dispatch(toggleDataMenu(current_column_name)),
        setSelectedColumn: current_column_name => dispatch(setSelectedColumn(current_column_name)),
        setSelectedTimeframe: current_column_name => dispatch(setSelectedTimeframe(current_column_name)),
        processDataFromStoreForHistogram: current_column_name => dispatch(processDataFromStoreForHistogram(current_column_name))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CryptoColumnHeader);
