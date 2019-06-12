import React from "react";
import styles from "./CryptoRow.module.scss";
import crypto_logo from "../../../img/crypto_logo.png";

import Cell from "./Cell/Cell";

const CryptoRow = props => {
  return (
    <div className={styles.cryptoContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={crypto_logo} alt="" />
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.cryptoName}>{props.name}</div>
        {/*<div className={styles.description}>{props.industry}</div>*/}
      </div>

      {props.columns.map(columnData => (
        <Cell
          key={columnData.data_id}
          columnData={columnData}
          cryptoInfo={props.cryptoInfo}
        />
      ))}
    </div>
  );
};

export default CryptoRow;
