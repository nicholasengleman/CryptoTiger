import React, { Component } from "react";
import styles from "./Cell.module.scss";
import classNames from "classnames";
import winningNormal from "../../../img/winning-normal.png";
import losingNormal from "../../../img/losing-normal.png";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flash: false,
            previousValue: 0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.columnPeriod === 0) {
            if (prevState.previousValue !== nextProps.cryptoRawValue.toFixed(2)) {
                return {
                    flash: true,
                    previousValue: nextProps.cryptoRawValue.toFixed(2)
                };
            } else {
                return {
                    flash: false
                };
            }
        } else {
            if (prevState.previousValue !== nextProps.cryptoPercentChange) {
                return {
                    flash: true,
                    previousValue: nextProps.cryptoPercentChange
                };
            } else {
                return {
                    flash: false
                };
            }
        }
    }

    getValue = () => {
        if (this.props.columnPeriod === 0) {
            return "$" + this.props.cryptoRawValue.toFixed(2);
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
                <div className={this.state.flash ? styles.flash : ""}></div>
            </div>
        );
    }
}

export default Cell;
