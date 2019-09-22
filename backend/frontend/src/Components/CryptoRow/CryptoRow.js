import React, { Component } from "react";
import styles from "./CryptoRow.module.scss";

import { connect } from "react-redux";

import Cell from "./Cell/Cell";

class CryptoRow extends Component {
    constructor(props) {
        super(props);
    }
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
                                crypto_value={columnData.crypto_value}
                                crypto_name={columnData.name}
                                crypto_period={columnData.period}
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
