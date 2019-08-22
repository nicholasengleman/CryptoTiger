import React, {Component} from "react";
import styles from "./Cell.module.scss";
import classNames from "classnames";
import winning_normal from "../../../../img/winning-normal.png";
import losing_normal from "../../../../img/losing-normal.png";

class Cell extends Component {

    getValue = () => {
        if (this.props.crypto_period === 0) {
            return "$" + this.props.crypto_value;
        } else {
            return this.props.crypto_value + "%";
        }
    };

    render() {
        return (
            <div className={styles.dataContainer}>
        <span
            className={classNames(
                styles.priceData,
                this.props.crypto_value > 0 ? styles.up : styles.down
            )}
        >
          {this.getValue()}
            <span className={styles.arrowContainer}>
            <img
                className={styles.arrow}
                src={this.props.crypto_value > 0 ? winning_normal : losing_normal}
                alt=""
            />
          </span>
        </span>

                <div className={styles.description}> {this.props.crypto_name} </div>
            </div>
        );
    }
}

export default Cell;
