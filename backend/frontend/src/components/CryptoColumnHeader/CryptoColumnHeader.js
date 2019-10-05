import React, { Component } from "react";
import "./CryptoColumnHeader.scss";
import EditMenu from "./../EditMenu/EditMenu";

class CryptoColumnHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyShowMenuClasses: false,
            applyHideMenuClasses: false
        };
    }

    onToggleEditMenu = () => {
        if (!this.state.applyShowMenuClasses) {
            this.setState({ applyShowMenuClasses: true });
        } else {
            this.setState(
                {
                    applyShowMenuClasses: false,
                    applyHideMenuClasses: true
                },
                () => {
                    let that = this;
                    window.setTimeout(function() {
                        that.setState({ applyHideMenuClasses: false });
                    }, 100);
                }
            );
        }
    };

    render() {
        return (
            <div className="column">
                {this.props.filter && Object.entries(this.props.filter.parameters).length > 0 ? (
                    <div className="filter-description">
                        only showing {parseInt(this.props.filter.parameters.selectionMin)}% to{" "}
                        {parseInt(this.props.filter.parameters.selectionMax)}%
                    </div>
                ) : (
                    <div className="filter-description"></div>
                )}

                {this.props.column_name !== "Current Price" ? (
                    <EditMenu
                        applyShowMenuClasses={this.state.applyShowMenuClasses}
                        applyHideMenuClasses={this.state.applyHideMenuClasses}
                        columnId={this.props.columnId}
                        columnName={this.props.columnName}
                        columnIndex={this.props.index}
                        columnPeriod={this.props.period}
                        toggleEditMenu={this.onToggleEditMenu}
                    />
                ) : null}
                <div className="column-name">
                    {this.props.columnName}
                    {this.props.columnName !== "Current Price" ? (
                        <i className="far fa-edit" onClick={() => this.onToggleEditMenu()}></i>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default CryptoColumnHeader;
