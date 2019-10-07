import React, { Component } from "react";
import styles from "./CryptoRow.module.scss";

import { connect } from "react-redux";

import Cell from "./Cell/Cell";

class CryptoRow extends Component {
    render() {
        return (
            <div className={styles.cryptoContainer}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src={"https://www.cryptocompare.com".concat(this.props.crypto_icon)}
                        alt=""
                    />
                </div>

                <div className={styles.dataContainer}>
                    <div className={styles.cryptoName}>{this.props.crypto_name}</div>
                    {/*<div className={styles.description}>{props.industry}</div>*/}
                </div>

                {this.props.columns.map(
                    (columnData, index) =>
                        this.props.column_visibility[index] && (
                            <Cell
                                key={columnData.name}
                                rawValue={columnData.rawValue}
                                percentChange={columnData.percentChange}
                                name={columnData.name}
                                period={columnData.period}
                            />
                        )
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        column_visibility: state.columns.column_visibility
    };
};

export default connect(mapStateToProps)(CryptoRow);
