import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  fetchCryptosBegin,
  fetchCryptosSuccess,
  fetchCryptosFailure,
  loadInitialColumnData
} from "../../store/actions/actionCreators";

import styles from "./Homepage.module.scss";

import CryptoRow from "./CryptoRow/CryptoRow";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {
  componentDidMount() {
    this.props.CryptosBegin();
    axios
      .get("http://localhost:5000/api/updatedata")
      .then(response => {
        this.props.CryptosSuccess(response.data);
        this.props.loadInitialColData(response.data);
        console.log("[Success]", response.data);
      })
      .catch(error => {
        this.props.CryptosFailure(error);
        console.log("[Error]", error);
      });
  }

  render() {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <DataMenu />
        </div>
        <div className={styles.cryptoListContainer}>
          <CryptoListHeader />
          {this.props.cryptos &&
            this.props.cryptos.map(crypto => (
              <CryptoRow
                key={crypto[0]}
                cryptoInfo={crypto[1].data}
                name="Demo"
                columns={this.props.columns}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cryptos: state.cryptoData.cryptos,
    columns: state.dataMenu.columns
  };
};

const mapDispatchToProps = dispatch => {
  return {
    CryptosBegin: () => dispatch(fetchCryptosBegin()),
    CryptosSuccess: data => dispatch(fetchCryptosSuccess(data)),
    CryptosFailure: error => dispatch(fetchCryptosFailure(error)),
    loadInitialColData: data1 => dispatch(loadInitialColumnData(data1))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
