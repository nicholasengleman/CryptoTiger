import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import property from "../../../img/icons8-property.png";
import "./CryptoColumnHeader.scss";
import EditMenu from "./../../Menu/Menu";
import OutsideAlerter from "./../../OutsideAlerter/OutsideAlerter";

import {
    removeFilter,
    sortByThisColumn
} from "./../../../store/actions/actionCreators";

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
        let sortArrowClass;

        const {
            filter,
            index,
            columnId,
            columnName,
            columnPeriod,
            columnType,
            columnGroup,
            removeFilter,
            sortByThisColumn
        } = this.props;
        const { sortColumn, sortDown } = this.props.cryptoData;

        if (sortColumn === columnId && sortDown === true) {
            sortArrowClass = "highlightDown";
        } else if (sortColumn === columnId && sortDown === false) {
            sortArrowClass = "highlightUp";
        } else {
            sortArrowClass = "noHighlight";
        }

        return (
            <div className="column">
                {filter && Object.entries(filter.parameters).length > 0 ? (
                    <div
                        className="filterDescription"
                        onClick={() => removeFilter(columnId)}
                    >
                        {filter.parameters.selectionMin.toFixed(2)}% to{" "}
                        {filter.parameters.selectionMax.toFixed(2)}%
                        <span className="deleteFilter">X</span>
                    </div>
                ) : (
                    ""
                )}

                {this.props.columnName !== "Current Price" ? (
                    <OutsideAlerter outsideClick={this.closeEditMenu}>
                        <EditMenu
                            applyShowMenuClasses={
                                this.state.applyShowMenuClasses
                            }
                            applyHideMenuClasses={
                                this.state.applyHideMenuClasses
                            }
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
                    {columnName !== "Current Price" ? (
                        <React.Fragment>
                            <i
                                className={`fas fa-sort-down header-sort-icon ${sortArrowClass}`}
                            ></i>
                            <p onClick={() => sortByThisColumn(columnId)}>
                                {columnName}
                            </p>
                            <img
                                className="property"
                                src={property}
                                alt=""
                                onClick={this.onToggleEditMenu}
                            />
                        </React.Fragment>
                    ) : (
                        <p>{columnName}</p>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cryptoData: state.cryptoData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeFilter: columnId => dispatch(removeFilter(columnId)),
        sortByThisColumn: columnId => dispatch(sortByThisColumn(columnId))
    };
};

CryptoColumnHeader.propTypes = {
    filter: PropTypes.object,
    index: PropTypes.number,
    columnId: PropTypes.number,
    columnName: PropTypes.string,
    columnPeriod: PropTypes.number,
    columnType: PropTypes.string,
    columnGroup: PropTypes.string,
    removeFilter: PropTypes.func,
    sortByThisColumn: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoColumnHeader);
