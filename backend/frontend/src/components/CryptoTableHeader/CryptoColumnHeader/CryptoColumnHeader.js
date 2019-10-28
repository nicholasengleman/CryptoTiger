import React, { Component } from "react";
import "./CryptoColumnHeader.scss";
import EditMenu from "./../../Menu/Menu";
import OutsideAlerter from "./../../OutsideAlerter/OutsideAlerter";

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
                    this.setState({ applyHideMenuClasses: false });
                }
            );
        }
    };

    closeEditMenu = () => {
        this.setState(
            {
                applyShowMenuClasses: false,
                applyHideMenuClasses: true
            },
            () => {
                this.setState({ applyHideMenuClasses: false });
            }
        );
    };

    render() {
        return (
            <div className="column">
                {this.props.filter && Object.entries(this.props.filter.parameters).length > 0 ? (
                    <div className="filter-description">
                        {this.props.filter.parameters.selectionMin.toFixed(2)}% to{" "}
                        {this.props.filter.parameters.selectionMax.toFixed(2)}%
                    </div>
                ) : (
                    <div className="filter-description"></div>
                )}

                {this.props.columnName !== "Current Price" ? (
                    <OutsideAlerter outsideClick={this.closeEditMenu}>
                        <EditMenu
                            applyShowMenuClasses={this.state.applyShowMenuClasses}
                            applyHideMenuClasses={this.state.applyHideMenuClasses}
                            columnId={this.props.columnId}
                            columnName={this.props.columnName}
                            columnIndex={this.props.index}
                            columnPeriod={this.props.columnPeriod}
                            columnType={this.props.columnType}
                            columnGroup={this.props.columnGroup}
                            toggleEditMenu={this.onToggleEditMenu}
                        />
                    </OutsideAlerter>
                ) : null}
                <div className="column-name">
                    <p>{this.props.columnName}</p>
                    {this.props.columnName !== "Current Price" ? (
                        <i className="far fa-edit" onClick={() => this.onToggleEditMenu()}></i>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default CryptoColumnHeader;
