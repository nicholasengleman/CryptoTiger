import React from "react";
import styles from "./CryptoRow.module.scss";

import Cell from "./Cell/Cell";

const CryptoRow = props => {

  return (
    <div className={styles.cryptoContainer}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={"https://www.cryptocompare.com".concat(props.crypto_icon)} alt="" />
      </div>

      <div className={styles.dataContainer}>
        <div className={styles.cryptoName}>{props.crypto_name}</div>
        {/*<div className={styles.description}>{props.industry}</div>*/}
      </div>

      {props.columns.map(columnData => (
        <Cell
          key={columnData.name}
          crypto_value={columnData.crypto_value}
          crypto_name={columnData.name}
          crypto_period={columnData.period}
        />
      ))}

    </div>
  );
};

export default CryptoRow;
