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
      columns: getDefaultColumns(),
      dataMenu: {
        open: false,
        id: ""
      }
    };
  }

  handleDataMenuToggle = id => {
    if (this.state.dataMenu.open === true && id === this.state.dataMenu.id) {
      this.setState({ dataMenu: { open: false, id: "" } });
    } else {
      this.setState({ dataMenu: { open: true, id: id } });
    }
  };

  handleDataChange = new_data_id => {
    const columns = [...this.state.columns];
    let dataMenu = { ...this.state.dataMenu };

    columns.forEach(function(column, index) {
      if (column.data_id === this.state.dataMenu.id) {
        column.data_id = new_data_id;
        dataMenu.id = new_data_id;
      }
    }, this);

    this.setState({ columns });
    this.setState({ dataMenu });
  };

  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <DataMenu
            handleDataChange={this.handleDataChange}
            dataMenuData={this.state.dataMenu}
          />
        </div>
        <div className={styles.cryptoListContainer}>
          <CryptoListHeader
            columns={this.state.columns}
            handleDataMenuToggle={this.handleDataMenuToggle}
          />
          {this.state.cryptos.map(props => (
            <Crypto key={props.id} {...props} columns={this.state.columns} />
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
