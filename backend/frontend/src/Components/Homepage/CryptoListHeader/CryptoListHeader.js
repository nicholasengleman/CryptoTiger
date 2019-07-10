import React from "react";
import styles from "./CryptoListHeader.module.scss";

import { connect } from "react-redux";

import CryptoHeader from "./CryptoHeader/CryptoHeader";
import AddNewColumnBtn from "./AddNewColumnBtn/AddNewColumnBtn";

const CryptoListHeader = props => {
  return (
    <div className={styles.filterColumnsHeader}>
      <div className={styles.spacer} />
      {props.columns.map(item => (
        <CryptoHeader
          key={item.data_id}
          id={item.data_id}
          name={item.name}
          handleDataMenuToggle={props.handleDataMenuToggle}
        />
      ))}
      <AddNewColumnBtn
          handleDataMenuToggle={props.handleDataMenuToggle}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    columns: state.dataMenu.columns
  };
};

export default connect(mapStateToProps)(CryptoListHeader);
