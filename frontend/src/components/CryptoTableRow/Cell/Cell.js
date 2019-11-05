import React, { Component } from "react";
import PropTypes from "prop-types";
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
        const { columnPeriod, cryptoRawValue, cryptoPercentChange } = this.props;

        if (columnPeriod === 0) {
            return "$" + cryptoRawValue.toFixed(4);
        } else {
            return cryptoPercentChange + "%";
        }
    };

    render() {
        const { columnPeriod, cryptoPercentChange, columnName } = this.props;
        return (
            <div className={styles.dataContainer}>
                <span
                    className={classNames(
                        styles.priceData,
                        columnPeriod !== 0 && cryptoPercentChange > 0 ? styles.up : styles.down
                    )}
                >
                    {this.getValue()}
                    {columnPeriod !== 0 && (
                        <span className={styles.arrowContainer}>
                            <img
                                className={styles.arrow}
                                src={cryptoPercentChange > 0 ? winningNormal : losingNormal}
                                alt=""
                            />
                        </span>
                    )}
                </span>

                <div className={styles.description}> {columnName} </div>
                <div className={this.state.flash ? styles.flash : ""}></div>
            </div>
        );
    }
}

Cell.propTypes = {
    columnPeriod: PropTypes.number,
    cryptoRawValue: PropTypes.number,
    cryptoPercentChange: PropTypes.number,
    columnName: PropTypes.string
};

export default Cell;
