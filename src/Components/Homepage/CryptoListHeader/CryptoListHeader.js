import React from "react";
import styles from "./CryptoListHeader.module.scss";

import CryptoHeader from "./CryptoHeader/CryptoHeader";

const CryptoListHeader = props => {
  return (
    <div className={styles.filterColumnsHeader}>
      <div className={styles.spacer} />
      {props.columns.map(item => (
        <CryptoHeader
          key={item.data_id}
          id={item.data_id}
          name={item.data_name}
          handleDataMenuToggle={props.handleDataMenuToggle}
        />
      ))}
    </div>
  );
};

export default CryptoListHeader;
