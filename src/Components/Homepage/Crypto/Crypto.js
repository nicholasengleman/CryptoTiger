import React from "react";
import styles from "./Crypto.module.scss";
import crypto_logo from "../../../img/crypto_logo.png";

import CryptoData from "./CryptoData/CryptoData";

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

      {props.columns.map(data => (
        <CryptoData key={data.data_id} columnData={data} data={props.data} />
      ))}
    </div>
  );
};

export default Crypto;
