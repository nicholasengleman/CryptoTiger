import React, { Component } from "react";
import styles from "./CryptoTableRow.module.scss";

import { connect } from "react-redux";

import Cell from "./Cell/Cell";

class CryptoTableRow extends Component {
    render() {
        return (
            <div className={styles.cryptoContainer}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src={"https://www.cryptocompare.com".concat(this.props.cryptoIcon)}
                        alt=""
                    />
                </div>

                <div className={styles.dataContainer}>
                    <div className={styles.cryptoName}>{this.props.cryptoName}</div>
                    {/*<div className={styles.description}>{props.industry}</div>*/}
                </div>

                {Object.keys(this.props.columns).map(
                    (columnData, index) =>
                        this.props.columnVisibility[index] && (
                            <Cell
                                key={this.props.columns[columnData].columnName}
                                cryptoRawValue={this.props.columns[columnData].cryptoRawValue}
                                cryptoPercentChange={this.props.columns[columnData].cryptoPercentChange}
                                columnName={this.props.columns[columnData].columnName}
                                columnPeriod={this.props.columns[columnData].columnPeriod}
                            />
                        )
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        columnVisibility: state.columns.columnVisibility
    };
};

export default connect(mapStateToProps)(CryptoTableRow);
