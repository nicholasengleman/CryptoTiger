import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCryptoData } from "../../store/reducers/cryptoData";

import styles from "./Homepage.module.scss";

import CryptoRow from "./CryptoRow/CryptoRow";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCryptoData());
    }

    render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <DataMenu />
        </div>
        <div className={styles.cryptoListContainer}>
          <CryptoListHeader />
          {this.props.cryptos.map(props => (
            <CryptoRow key={props.id} {...props} columns={this.props.columns} />
          ))}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    cryptos: state.dataMenu.cryptos,
    columns: state.dataMenu.columns
  };
};

export default connect(
  MapStateToProps)(Homepage);
