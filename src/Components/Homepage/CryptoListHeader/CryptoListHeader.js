import React from "react";
import styles from "./CryptoListHeader.module.scss";
import sort_icon from "./../../../img/data_menu.png";

const CryptoListHeader = props => {
  return (
    <div className={styles.filterColumnsHeader}>
      <div className={styles.spacer} />
      {props.columns.map(column => (
        <div key={column.data_id} className={styles.column}>
          {column.data_name}
          <img className={styles.sort_icon} src={sort_icon} alt="" />
        </div>
      ))}
    </div>
  );
};

export default CryptoListHeader;
