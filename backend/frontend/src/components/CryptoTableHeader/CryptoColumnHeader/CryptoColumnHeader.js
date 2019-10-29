import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CryptoColumnHeader.scss";
import EditMenu from "./../../Menu/Menu";
import OutsideAlerter from "./../../OutsideAlerter/OutsideAlerter";

import { removeFilter } from "./../../../store/actions/actionCreators";

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
                    window.setTimeout(() => {
                        this.setState({ applyHideMenuClasses: false });
                    }, 100);
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
        const { filter, index, columnId, columnName, columnPeriod, columnType, columnGroup, removeFilter } = this.props;
        return (
            <div className="column">
                {filter && Object.entries(filter.parameters).length > 0 ? (
                    <div className="filterDescription" onClick={() => removeFilter(columnId)}>
                        {filter.parameters.selectionMin.toFixed(2)}% to {filter.parameters.selectionMax.toFixed(2)}%
                        <span className="deleteFilter">X</span>
                    </div>
                ) : (
                    ""
                )}

                {this.props.columnName !== "Current Price" ? (
                    <OutsideAlerter outsideClick={this.closeEditMenu}>
                        <EditMenu
                            applyShowMenuClasses={this.state.applyShowMenuClasses}
                            applyHideMenuClasses={this.state.applyHideMenuClasses}
                            columnId={columnId}
                            columnName={columnName}
                            columnIndex={index}
                            columnPeriod={columnPeriod}
                            columnType={columnType}
                            columnGroup={columnGroup}
                            toggleEditMenu={this.onToggleEditMenu}
                        />
                    </OutsideAlerter>
                ) : null}
                <div className="columnName">
                    <p>{columnName}</p>
                    {columnName !== "Current Price" ? (
                        <i className="far fa-edit" onClick={this.onToggleEditMenu}></i>
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFilter: columnId => dispatch(removeFilter(columnId))
    };
};

CryptoColumnHeader.propTypes = {
    filter: PropTypes.array,
    index: PropTypes.number,
    columnId: PropTypes.number,
    columnName: PropTypes.string,
    columnPeriod: PropTypes.number,
    columnType: PropTypes.string,
    columnGroup: PropTypes.string,
    removeFilter: PropTypes.func
};

export default connect(
    null,
    mapDispatchToProps
)(CryptoColumnHeader);
