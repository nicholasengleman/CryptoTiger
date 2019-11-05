import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CryptoTableRow.module.scss";

import { connect } from "react-redux";

import Cell from "./Cell/Cell";

class CryptoTableRow extends Component {
    render() {
        const { columns, cryptoIcon, cryptoName, columnVisibility } = this.props;
        return (
            <div className={styles.cryptoContainer}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={"https://www.cryptocompare.com".concat(cryptoIcon)} alt="" />
                </div>

                <div className={styles.dataContainer}>
                    <div className={styles.cryptoName}>{cryptoName}</div>
                    {/*<div className={styles.description}>{props.industry}</div>*/}
                </div>

                {Object.keys(columns).map(
                    (columnData, index) =>
                        columnVisibility[index] && (
                            <Cell
                                key={columns[columnData].columnName}
                                cryptoRawValue={columns[columnData].cryptoRawValue}
                                cryptoPercentChange={columns[columnData].cryptoPercentChange}
                                columnName={columns[columnData].columnName}
                                columnPeriod={columns[columnData].columnPeriod}
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

CryptoTableRow.propTypes = {
    columns: PropTypes.object,
    cryptoIcon: PropTypes.string,
    cryptoName: PropTypes.string,
    columnVisibility: PropTypes.array
};

export default connect(mapStateToProps)(CryptoTableRow);
