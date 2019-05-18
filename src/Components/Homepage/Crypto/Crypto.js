import React from "react";
import styles from "./Crypto.module.scss";
import classNames from "classnames";
import crypto_logo from "../../../img/crypto_logo.png";
import winning_normal from "../../../img/winning-normal.png";
import losing_normal from "../../../img/losing-normal.png";

const Crypto = props => {
  return (
    <div className={styles.cryptoContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={crypto_logo} alt="" />
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.cryptoName}>{props.name}</div>
        <div className={styles.description}>{props.industry}</div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.priceData}>${props.priceData.price}</div>
        <div className={styles.description}>Current price</div>
      </div>
      <div className={styles.dataContainer}>
        <span
          className={classNames(
            styles.priceData,
            props.priceData.day["7d"] > 0 ? styles.up : styles.down
          )}
        >
          {props.priceData.day["7d"]}%
          <span className={styles.arrowContainer}>
            <img
              className={styles.arrow}
              src={
                props.priceData.day["7d"] > 0 ? winning_normal : losing_normal
              }
              alt=""
            />
          </span>
        </span>
        <div className={styles.description}>7-Day Price Change</div>
      </div>
      <div className={styles.dataContainer}>
        <span className={styles.priceData}>${props.volumeData.volume}B</span>
        <div className={styles.description}>Current volume</div>
      </div>
      <div className={styles.dataContainer}>
        <span
          className={classNames(
            styles.priceData,
            props.priceData.day["7d"] > 0 ? styles.up : styles.down
          )}
        >
          {props.volumeData.day["7d"]}%
          <span className={styles.arrowContainer}>
            <img
              className={styles.arrow}
              src={
                props.volumeData.day["7d"] > 0 ? winning_normal : losing_normal
              }
              alt=""
            />
          </span>
        </span>
        <div className={styles.description}>7-Day Volume Change</div>
      </div>
    </div>
  );
};

export default Crypto;
