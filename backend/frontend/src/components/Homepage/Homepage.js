import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import selectFilteredCryptos from "./../../store/selectors/selectFilteredCryptos";
import socketIOClient from "socket.io-client";

import {
    fetchCryptosFailure,
    fetchCryptosSuccess,
    updateCurrentData,
    setColumns
} from "../../store/actions/actionCreators";

import styles from "./Homepage.module.scss";

import CryptoRow from "../CryptoRow/CryptoRow";
import CryptoListHeader from "../CryptoListHeader/CryptoListHeader";
import DataSelectorContainer from "./../DataSelectorContainer/DataSelectorContainer";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://localhost:5000/"
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/api/crypto-data/getDefaultData")
            .then(response => {
                this.props.CryptosSuccess(response.data);
                this.props.setColumns(response.data.length);
            })
            .catch(error => {
                this.props.CryptosFailure(error);
                console.log("[Error]", error);
            });

        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on("currentDataUpdate", message => {
        //     this.props.updateCurrentData(message);
        // });
    }

    render() {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.hero}>
                    <DataSelectorContainer />
                </div>
                <div className={styles.cryptoListContainer}>
                    <CryptoListHeader />
                    {this.props.cryptosData &&
                        Object.keys(this.props.cryptosData).map(crypto => (
                            <CryptoRow
                                key={this.props.cryptosData[crypto].crypto_id}
                                cryptoInfo={this.props.cryptosData[crypto].crypto_id}
                                crypto_icon={this.props.cryptosData[crypto].crypto_icon_url}
                                crypto_name={this.props.cryptosData[crypto].crypto_name}
                                columns={this.props.cryptosData[crypto].columns}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cryptosData: selectFilteredCryptos(state.cryptoData.data, state.filterData.filterParameters)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentData: data => dispatch(updateCurrentData(data)),
        CryptosSuccess: data => dispatch(fetchCryptosSuccess(data)),
        CryptosFailure: error => dispatch(fetchCryptosFailure(error)),
        setColumns: columns => dispatch(setColumns(columns))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
