import React, { Component } from "react";
import { getAllCryptos, getDefaultColumns } from "../../Services/cryptos";

import styles from "./Homepage.module.scss";

import Crypto from "./Crypto/Crypto";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: getAllCryptos(),
      columns: getDefaultColumns()
    };
  }

  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <DataMenu />
        </div>
        <div className={styles.cryptoListContainer}>
          <CryptoListHeader columns={this.state.columns} />
          {this.state.cryptos.map(props => (
            <Crypto key={props.id} {...props} columns={this.state.columns} />
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
