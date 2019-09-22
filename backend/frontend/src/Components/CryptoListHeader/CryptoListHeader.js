import React, { Component } from "react";
import styles from "./CryptoListHeader.module.scss";

import { connect } from "react-redux";
import {
    setColumns,
    setColumnsThatAreVisible,
    shiftVisibleColumnsForward,
    shiftVisibleColumnsBackwards
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
            this.props.setColumnsThatAreVisible(this.columnsToShow());
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

    findFilter = timeframe_name => {
        return this.props.filters.find(filter => {
            return filter.column === timeframe_name;
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

    render() {
        return (
            <div className={styles.filterColumnsHeader}>
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
                            (timeframe, index) =>
                                this.props.column_visibility[index] && (
                                    <CryptoColumnHeader
                                        ref={this.Column}
                                        key={index}
                                        column_name={timeframe.name}
                                        filter={this.findFilter(timeframe.name)}
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
        filters: state.cryptoData.filterParameters,
        column_visibility: state.columns.column_visibility
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setColumns: columns => dispatch(setColumns(columns)),
        setColumnsThatAreVisible: visibleColumns => dispatch(setColumnsThatAreVisible(visibleColumns)),
        shiftVisibleColumnsForward: () => dispatch(shiftVisibleColumnsForward()),
        shiftVisibleColumnsBackwards: () => dispatch(shiftVisibleColumnsBackwards())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoListHeader);
