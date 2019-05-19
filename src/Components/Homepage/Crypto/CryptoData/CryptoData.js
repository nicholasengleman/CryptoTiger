import React from "react";
import styles from "./CryptoData.module.scss";
import classNames from "classnames";
import winning_normal from "../../../../img/winning-normal.png";
import losing_normal from "../../../../img/losing-normal.png";

const CryptoData = props => {
  return (
    <div className={styles.dataContainer}>
      <span
      // className={classNames(
      //   styles.priceData,
      //   props.priceData.day["7d"] > 0 ? styles.up : styles.down
      // )}
      >
        {/* {props.priceData.day["7d"]}% */}
        {/* <span className={styles.arrowContainer}>
          <img
            className={styles.arrow}
            src={props.priceData.day["7d"] > 0 ? winning_normal : losing_normal}
            alt=""
          />
        </span> */}
      </span>
      {/* <div className={styles.description}>{props.columnData.data_name}</div> */}
      <div className={styles.description}>{props.columnData.data_location}</div>
    </div>
  );
};

export default CryptoData;
