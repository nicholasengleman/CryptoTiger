import React, { Component } from "react";
import styles from "./Cell.module.scss";
import classNames from "classnames";
import winningNormal from "../../../img/winning-normal.png";
import losingNormal from "../../../img/losing-normal.png";

class Cell extends React.PureComponent {
    getValue = () => {
        if (this.props.columnPeriod === 0) {
            return "$" + this.props.cryptoRawValue;
        } else {
            return this.props.cryptoPercentChange + "%";
        }
    };

    render() {
        return (
            <div className={styles.dataContainer}>
                <span
                    className={classNames(
                        styles.priceData,
                        this.props.columnPeriod !== 0 && this.props.cryptoPercentChange > 0 ? styles.up : styles.down
                    )}
                >
                    {this.getValue()}
                    {this.props.columnPeriod !== 0 && (
                        <span className={styles.arrowContainer}>
                            <img
                                className={styles.arrow}
                                src={this.props.cryptoPercentChange > 0 ? winningNormal : losingNormal}
                                alt=""
                            />
                        </span>
                    )}
                </span>

                <div className={styles.description}> {this.props.columnName} </div>
            </div>
        );
    }
}

export default Cell;
