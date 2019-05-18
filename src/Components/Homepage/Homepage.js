import React, { Component } from "react";
import { getAllCryptos } from "../../Services/cryptos";

import styles from "./Homepage.module.scss";

import Crypto from "./Crypto/Crypto";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: getAllCryptos()
      filterheader: [
        { 
          
        }
      ]
      }
    };
  }

  render() {
    return (
      <div className={styles.pageContainer}>
    
        <div className={styles.cryptoListContainer}>
          <div className={styles.cryptoListHeader}>
            <div></div>
          </div>
          {this.state.cryptos.map(props => (
            <Crypto key={props.id} {...props} />
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
