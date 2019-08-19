import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import axios from "axios";

import {
    fetchCryptosBegin,
    fetchCryptosSuccess,
    fetchCryptosFailure,
    updateCurrentData
} from "../../store/actions/actionCreators";

import styles from "./Homepage.module.scss";

import CryptoRow from "./CryptoRow/CryptoRow";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://localhost:5000/"
        };
    }

    componentDidMount() {
        this.props.CryptosBegin();
        axios
            .get("http://localhost:5000/api/crypto-data/getDefaultData")
            .then(response => {
                console.log(response.data);
                this.props.CryptosSuccess(response.data);
            })
            .catch(error => {
                this.props.CryptosFailure(error);
                console.log("[Error]", error);
            });

        const update = message => {
            this.props.updateCurrentData(message);
        };

        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('FromAPI', function (message) {
        //   //console.log(message);
        //  update(message);
        // });
    }

    render() {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.hero}>
                    <DataMenu />
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
        cryptosData: state.cryptoData.allData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentData: data => dispatch(updateCurrentData(data)),
        CryptosBegin: () => dispatch(fetchCryptosBegin()),
        CryptosSuccess: data => dispatch(fetchCryptosSuccess(data)),
        CryptosFailure: error => dispatch(fetchCryptosFailure(error))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
