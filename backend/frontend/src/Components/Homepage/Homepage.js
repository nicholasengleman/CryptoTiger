import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {fetchCryptosBegin, fetchCryptosSuccess, fetchCryptosFailure} from "../../store/actions/actionCreators";

import styles from "./Homepage.module.scss";

import CryptoRow from "./CryptoRow/CryptoRow";
import CryptoListHeader from "./CryptoListHeader/CryptoListHeader";
import DataMenu from "./DataMenu/DataMenu";

class Homepage extends Component {

    componentDidMount() {
        this.props.CryptosBegin();
        axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?e059e20e2ac72a679e388f3b9e4e04e7523705d10ca496d0bb70889786e235a0")
            .then((response) => {
                this.props.CryptosSuccess(response.data.Data);
                console.log("[Success]", response.data.Data);
            }).catch((error) => {
             this.props.CryptosFailure(error);
            console.log("[Error]", error);
        });
    }


    render() {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.hero}>
                    <DataMenu/>
                </div>
                <div className={styles.cryptoListContainer}>
                    <CryptoListHeader/>
                    {this.props.cryptos.map(crypto => (
                        <CryptoRow key={crypto.CoinInfo.id} cryptoInfo={crypto.RAW.USD} name={crypto.CoinInfo.FullName}  columns={this.props.columns}/>
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
        CryptosSuccess: (data) => dispatch(fetchCryptosSuccess(data)),
        CryptosFailure: (error) => dispatch(fetchCryptosFailure(error))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Homepage);


