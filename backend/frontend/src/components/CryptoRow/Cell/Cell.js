import React, { Component } from "react";
import styles from "./Cell.module.scss";
import classNames from "classnames";
import winning_normal from "../../../img/winning-normal.png";
import losing_normal from "../../../img/losing-normal.png";

class Cell extends React.PureComponent {
    getValue = () => {
        if (this.props.period === 0) {
            return "$" + this.props.rawValue;
        } else {
            return this.props.percentChange + "%";
        }
    };

    render() {
        return (
            <div className={styles.dataContainer}>
                <span
                    className={classNames(
                        styles.priceData,
                        this.props.period !== 0 && this.props.percentChange > 0 ? styles.up : styles.down
                    )}
                >
                    {this.getValue()}
                    {this.props.period !== 0 && (
                        <span className={styles.arrowContainer}>
                            <img
                                className={styles.arrow}
                                src={this.props.percentChange > 0 ? winning_normal : losing_normal}
                                alt=""
                            />
                        </span>
                    )}
                </span>

                <div className={styles.description}> {this.props.name} </div>
            </div>
        );
    }
}

export default Cell;
