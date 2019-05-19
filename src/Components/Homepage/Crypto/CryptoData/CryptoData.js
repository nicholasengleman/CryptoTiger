import React from "react";
import styles from "./CryptoData.module.scss";
import classNames from "classnames";
import winning_normal from "../../../../img/winning-normal.png";
import losing_normal from "../../../../img/losing-normal.png";

const CryptoData = props => {
  return (
    <div className={styles.dataContainer}>
      <span
        className={classNames(
          styles.priceData,
          props.data[props.columnData.data_id].data_value > 0
            ? styles.up
            : styles.down
        )}
      >
        {props.data[props.columnData.data_id].data_value}
        <span className={styles.arrowContainer}>
          <img
            className={styles.arrow}
            src={
              props.data[props.columnData.data_id].data_value > 0
                ? winning_normal
                : losing_normal
            }
            alt=""
          />
        </span>
      </span>

      <div className={styles.priceDescription}>
        {props.data[props.columnData.data_id].data_name}
      </div>
    </div>
  );
};

export default CryptoData;
