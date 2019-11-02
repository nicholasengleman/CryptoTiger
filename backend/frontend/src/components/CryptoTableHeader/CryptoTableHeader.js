import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import axios from "axios";
import styles from "./CryptoTableHeader.module.scss";

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

import CryptoColumnHeader from "./CryptoColumnHeader/CryptoColumnHeader";
import Button from "./../Button/Button";

class CryptoTableHeader extends Component {
    constructor(props) {
        super(props);
        this.Viewport = React.createRef();
        this.colu = React.createRef();
        this.setColumnsThatAreVisibleDebounce = _.throttle(this.props.setColumnsThatAreVisible.bind(this), 50, {
            leading: true
        });
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            this.setColumnsThatAreVisibleDebounce(this.columnsToShow());
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
            this.setColumnsThatAreVisibleDebounce(this.columnsToShow());
        }
    }

    columnsToShow = () => {
        let columnWidth = 0;
        if (1200 <= window.innerWidth) {
            columnWidth = 155 + 25; //column width + right margin
        } else if (678 < window.innerWidth && window.innerWidth < 1200) {
            columnWidth = 118 + 25;
        } else {
            columnWidth = 90 + 25;
        }

        if (this.Viewport.current) {
            let viewportWidth = this.Viewport.current.clientWidth;
            let number_of_columns = this.props.columnVisibility.length;
            if ((number_of_columns + 1) * columnWidth > viewportWidth) {
                return Math.floor(viewportWidth / columnWidth) - 1;
            } else {
                return number_of_columns;
            }
        }
        return 1;
    };

    findFilter = columnId => {
        return this.props.filters.find(filter => {
            return filter.columnId === columnId;
        });
    };

    handleAddColumn = () => {
        const {
            toggleDataMenu,
            setSelectedDataPeriod,
            setSelectedColumnId,
            setSelectedDataName,
            processNewColumnData
        } = this.props;

        toggleDataMenu();
        setSelectedDataPeriod(1);
        setSelectedColumnId(this.props.columnVisibility.length);
        setSelectedDataName("1 hour price");
        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/${3600}`)
            .then(response => {
                processNewColumnData(response.data, this.props.columnVisibility.length, "1 hour price", 1);
            })
            .catch(error => {
                console.log("[Error]", error);
            });
    };

    render() {
        const { shiftVisibleColumnsBackwards, shiftVisibleColumnsForward, filters } = this.props;
        let showPrevBtn = false;
        let showNextBtn = false;

        if (this.props.columnVisibility[0] === false) {
            showPrevBtn = true;
        }
        if (this.props.columnVisibility[this.props.columnVisibility.length - 1] === false) {
            showNextBtn = true;
        }

        return (
            <div
                className={`${styles.filterColumnsHeader} 
                             ${!showPrevBtn && !showNextBtn ? styles.reduceMargin : ""}
                             ${filters.length ? styles.filterRow : ""}`}
            >
                {(showPrevBtn || showNextBtn) && (
                    <div className={styles.topRow}>
                        {showPrevBtn && (
                            <Button
                                name={"Prev"}
                                size={"small"}
                                className={styles.prevBtn}
                                onClick={shiftVisibleColumnsBackwards}
                            />
                        )}
                        {showNextBtn && (
                            <Button
                                name={"Next"}
                                size={"small"}
                                className={styles.nextBtn}
                                onClick={shiftVisibleColumnsForward}
                            /> //shows the "Next" button if at least the last column is set to not show
                        )}
                    </div>
                )}

                <div ref={this.Viewport} className={styles.bottomRow}>
                    <Button
                        name={"Add Column"}
                        size={"small"}
                        className={styles.addBtn}
                        onClick={this.handleAddColumn}
                    />
                    {this.props.cryptoData &&
                        Object.keys(this.props.cryptoData.columns).map(
                            (column, index) =>
                                this.props.columnVisibility[index] && (
                                    <CryptoColumnHeader
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
        processNewColumnData: (responseData, selectedColumnId, periodName, periodNumber) =>
            dispatch(processNewColumnData(responseData, selectedColumnId, periodName, periodNumber))
    };
};

CryptoTableHeader.propTypes = {
    toggleDataMenu: PropTypes.func,
    setSelectedDataPeriod: PropTypes.func,
    setSelectedColumnId: PropTypes.func,
    setSelectedDataName: PropTypes.func,
    processNewColumnData: PropTypes.func,
    shiftVisibleColumnsBackwards: PropTypes.func,
    shiftVisibleColumnsForward: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoTableHeader);
