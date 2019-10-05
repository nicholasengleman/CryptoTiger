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
    emptyHistogramData,
    setSelectedDataPeriod,
    setSelectedDataName,
    processNewColumnData
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
        let redux_visible_columns = 0;

        this.props.column_visibility.forEach(column => {
            if (column === true) {
                redux_visible_columns++;
            }
        });

        if (redux_visible_columns && redux_visible_columns !== this.columnsToShow()) {
            window.setTimeout(() => {
                this.props.setColumnsThatAreVisible(this.columnsToShow());
            }, 500);
        }
    }

    columnsToShow = () => {
        let column_width = 0;
        if (1200 <= window.innerWidth) {
            column_width = 155 + 15; //column width + right margin
        } else if (678 < window.innerWidth && window.innerWidth < 1200) {
            column_width = 118 + 19; //column width + right margin
        } else {
            column_width = 90 + 18; //column width + right margin
        }

        let viewport_width = this.Viewport.current.clientWidth;

        if (this.props.column_visibility.length * column_width > viewport_width) {
            return Math.floor((viewport_width - 100) / column_width);
        } else {
            return Math.floor(viewport_width / column_width);
        }
    };

    findFilter = columnId => {
        return this.props.filters.find(filter => {
            return filter.columnId === columnId;
        });
    };

    handleAddColumn = () => {
        this.props.toggleDataMenu();
        this.props.emptyHistogramData();
        this.props.setSelectedDataPeriod(1);
        this.props.setSelectedDataName("1 hour price");
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${3600}`)
            .then(response => {
                this.props.processNewColumnData("1 hour price", response.data);
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
                    {this.props.column_visibility[0] === false && (
                        <Button
                            name={"Prev"}
                            size={"small"}
                            style={this.prevBtnStyles}
                            onClick={() => this.props.shiftVisibleColumnsBackwards()}
                        /> //shows the "Prev" button if at least the first column is set to not show
                    )}
                    {this.props.crypto &&
                        this.props.crypto.columns.map(
                            (column, index) =>
                                this.props.column_visibility[index] && (
                                    <CryptoColumnHeader
                                        ref={this.Column}
                                        key={index}
                                        index={index}
                                        columnId={column.columnId}
                                        period={column.period}
                                        columnName={column.name}
                                        filter={this.findFilter(column.columnId)}
                                    />
                                )
                        )}
                    {this.props.column_visibility[this.props.column_visibility.length - 1] === false && (
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
        crypto: state.cryptoData.allData["1182"],
        filters: state.filterData.filterParameters,
        column_visibility: state.columns.column_visibility
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setColumns: columns => dispatch(setColumns(columns)),
        setColumnsThatAreVisible: visibleColumns => dispatch(setColumnsThatAreVisible(visibleColumns)),
        shiftVisibleColumnsForward: () => dispatch(shiftVisibleColumnsForward()),
        shiftVisibleColumnsBackwards: () => dispatch(shiftVisibleColumnsBackwards()),
        toggleDataMenu: () => dispatch(toggleDataMenu()),
        emptyHistogramData: () => dispatch(emptyHistogramData()),
        setSelectedDataPeriod: dataPeriod => dispatch(setSelectedDataPeriod(dataPeriod)),
        setSelectedDataName: dataName => dispatch(setSelectedDataName(dataName)),
        processNewColumnData: (newTimeframeName, responseData) =>
            dispatch(processNewColumnData(newTimeframeName, responseData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoListHeader);
