import React, { Component } from "react";
import styles from "./CryptoListHeader.module.scss";

import { connect } from "react-redux";
import { setColumns, setColumnsThatAreVisible } from "../../store/actions/actionCreators";

import CryptoColumnHeader from "../CryptoColumnHeader/CryptoColumnHeader";
import Button from "./../Button/Button";

class CryptoListHeader extends Component {
    constructor(props) {
        super(props);

        this.Viewport = React.createRef();
        this.Column = React.createRef();
    }

    componentDidMount() {
        this.props.setColumnsThatAreVisible(this.columnsToShow());
        window.addEventListener("resize", () => {
            this.props.setColumnsThatAreVisible(this.columnsToShow());
        });
    }

    // componentDidUpdate() {
    //     if (this.props.crypto.columns.length != this.state.columnNumber) {
    //         this.setState({
    //             columnNumber: this.props.crypto.columns.length
    //         });
    //     }
    // }

    columnsToShow = () => {
        const column_width = 155;
        return Math.floor(this.Viewport.current.clientWidth / column_width);
    };

    findFilter = timeframe_name => {
        return this.props.filters.find(filter => {
            return filter.column === timeframe_name;
        });
    };

    render() {
        return (
            <div className={styles.filterColumnsHeader}>
                <div className={styles.spacer} />

                <div ref={this.Viewport} className="viewport">
                    {this.props.crypto &&
                        this.props.crypto.columns.map((timeframe, index) => (
                            <CryptoColumnHeader
                                ref={this.Column}
                                key={index}
                                column_name={timeframe.name}
                                filter={this.findFilter(timeframe.name)}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        crypto: state.cryptoData.allData["1182"],
        filters: state.cryptoData.filterParameters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setColumns: columns => dispatch(setColumns(columns)),
        setColumnsThatAreVisible: visibleColumns => dispatch(setColumnsThatAreVisible(visibleColumns))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CryptoListHeader);
