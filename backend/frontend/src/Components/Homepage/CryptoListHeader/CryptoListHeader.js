import React from "react";
import styles from "./CryptoListHeader.module.scss";

import { connect } from "react-redux";

import CryptoHeader from "./CryptoHeader/CryptoHeader";
import AddNewColumnBtn from "./AddNewColumnBtn/AddNewColumnBtn";
import {toggleDataMenu} from "../../../store/actions/actionCreators";

const CryptoListHeader = props => {
  return (
    <div className={styles.filterColumnsHeader}>
      <div className={styles.spacer} />

      {props.crypto && props.crypto.columns.map(timeframe => (
        <CryptoHeader
          key={timeframe.period}
          column_name={timeframe.name}
        />
      ))}
      <AddNewColumnBtn/>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    crypto: state.cryptoData.data[0]
  };
};

export default connect(mapStateToProps)(CryptoListHeader);
