import React, { Component } from "react";
import axios from "axios";
import styles from "./CryptoListHeader.module.scss";

import { connect } from "react-redux";
import {
    setColumns,
    setColumnsThatAreVisible,
    shiftVisibleColumnsForward,
    shiftVisibleColumnsBackwards,
    toggleDataMenu,
    setSelectedDataPeriod,
    setSelectedDataName,
    processNewColumnData,
    setSelectedColumnId
} from "../../store/actions/actionCreators";

import CryptoColumnHeader from "../CryptoColumnHeader/CryptoColumnHeader";
import Button from "./../Button/Button";

class CryptoListHeader extends Component {
    constructor(props) {
        super(props);
        this.Viewport = React.createRef();
        this.Column = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.props.setColumnsThatAreVisible(this.columnsToShow());
        });
    }

    componentDidUpdate() {
        let reduxVisibleColumns = 0;

        this.props.columnVisibility.forEach(column => {
            if (column === true) {
                reduxVisibleColumns++;
            }
        });

        if (reduxVisibleColumns && reduxVisibleColumns !== this.columnsToShow()) {
            window.setTimeout(() => {
                this.props.setColumnsThatAreVisible(this.columnsToShow());
            }, 500);
        }
    }

    columnsToShow = () => {
        let columnWidth = 0;
        if (1200 <= window.innerWidth) {
            columnWidth = 155 + 15; //column width + right margin
        } else if (678 < window.innerWidth && window.innerWidth < 1200) {
            columnWidth = 118 + 19; //column width + right margin
        } else {
            columnWidth = 90 + 18; //column width + right margin
        }

        let viewportWidth = this.Viewport.current.clientWidth;

        if (this.props.columnVisibility.length * columnWidth > viewportWidth) {
            return Math.floor((viewportWidth - 100) / columnWidth);
        } else {
            return Math.floor(viewportWidth / columnWidth);
        }
    };

    findFilter = columnId => {
        return this.props.filters.find(filter => {
            return filter.columnId === columnId;
        });
    };

    handleAddColumn = () => {
        this.props.toggleDataMenu();
        this.props.setSelectedDataPeriod(1);
        this.props.setSelectedColumnId(this.props.columnVisibility.length);
        this.props.setSelectedDataName("1 hour price");
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${3600}`)
            .then(response => {
                this.props.processNewColumnData("1 hour price", 1, response.data, this.props.columnVisibility.length);
            })
            .catch(error => {
                console.log("[Error]", error);
            });
    };

    prevBtnStyles = {
        position: "absolute",
        left: "-100px",
        margin: "0"
    };

    nextBtnStyles = {
        position: "absolute",
        right: "10px",
        margin: "0"
    };

    addColumnBtnStyles = {
        position: "absolute",
        left: "100px",
        margin: "0"
    };

    render() {
        return (
            <div className={styles.filterColumnsHeader}>
                <Button
                    name={"Add Column"}
                    size={"small"}
                    style={this.addColumnBtnStyles}
                    onClick={() => this.handleAddColumn()}
                />
                <div className={styles.spacer} />

                <div ref={this.Viewport} className="viewport">
                    {this.props.columnVisibility[0] === false && (
                        <Button
                            name={"Prev"}
                            size={"small"}
                            style={this.prevBtnStyles}
                            onClick={() => this.props.shiftVisibleColumnsBackwards()}
                        /> //shows the "Prev" button if at least the first column is set to not show
                    )}
                    {this.props.cryptoData &&
                        Object.keys(this.props.cryptoData.columns).map(
                            (column, index) =>
                                this.props.columnVisibility[index] && (
                                    <CryptoColumnHeader
                                        ref={this.Column}
                                        key={index}
                                        index={index}
                                        columnId={this.props.cryptoData.columns[column].columnId}
                                        columnType={this.props.cryptoData.columns[column].columnType}
                                        columnGroup={this.props.cryptoData.columns[column].columnGroup}
                                        columnPeriod={this.props.cryptoData.columns[column].columnPeriod}
                                        columnName={this.props.cryptoData.columns[column].columnName}
                                        filter={this.findFilter(this.props.cryptoData.columns[column].columnId)}
                                    />
                                )
                        )}
                    {this.props.columnVisibility[this.props.columnVisibility.length - 1] === false && (
                        <Button
                            name={"Next"}
                            size={"small"}
                            style={this.nextBtnStyles}
                            onClick={() => this.props.shiftVisibleColumnsForward()}
                        /> //shows the "Next" button if at least the last column is set to not show
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cryptoData: state.cryptoData.data["1182"],
        filters: state.filterData.filterParameters,
        columnVisibility: state.columns.columnVisibility
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setColumns: columns => dispatch(setColumns(columns)),
        setColumnsThatAreVisible: visibleColumns => dispatch(setColumnsThatAreVisible(visibleColumns)),
        shiftVisibleColumnsForward: () => dispatch(shiftVisibleColumnsForward()),
        shiftVisibleColumnsBackwards: () => dispatch(shiftVisibleColumnsBackwards()),
        toggleDataMenu: () => dispatch(toggleDataMenu()),
        setSelectedDataPeriod: dataPeriod => dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: dataName => dispatch(setSelectedDataName(dataName)),
        setSelectedColumnId: columnId => dispatch(setSelectedColumnId(columnId)),
        processNewColumnData: (periodName, periodNumber, responseData, selectedColumnId) =>
            dispatch(processNewColumnData(periodName, periodNumber, responseData, selectedColumnId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoListHeader);
