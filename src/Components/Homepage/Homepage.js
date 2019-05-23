import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllCryptos, getDefaultColumns } from "../../Services/cryptos";
import styles from "./Homepage.module.scss";

import Crypto from "./Crypto/Crypto";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {
  //takes in data id from selected period in data Menu and set it to the data id on the column that opened the dataMenu
  // 1) put column data in store - done
  // 2) map column data to CryptoList Header - done
  // 3) on click of period in Data Menu, change the data id for that column id

  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <DataMenu />
        </div>
        <div className={styles.cryptoListContainer}>
          <CryptoListHeader />
          {this.props.cryptos.map(props => (
            <Crypto key={props.id} {...props} columns={this.props.columns} />
          ))}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    cryptos: state.cryptos,
    columns: state.columns
  };
};

export default connect(
  MapStateToProps,
  null
)(Homepage);
