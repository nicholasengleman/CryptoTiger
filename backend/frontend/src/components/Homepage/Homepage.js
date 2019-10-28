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

import CryptoRow from "../CryptoTableRow/CryptoTableRow";
import CryptoListHeader from "../CryptoTableHeader/CryptoTableHeader";
import DataSelectorModal from "../DataSelectorModal/DataSelectorModal";
import PresetsContainer from "./../PresetsContainer/PresetsContainer";

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

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("currentDataUpdate", message => {
            this.props.updateCurrentData(message);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.pageContainer}>
                    <div className={styles.hero}>
                        <PresetsContainer />
                    </div>
                    <div className={styles.cryptoTable}>
                        <CryptoListHeader />
                        {this.props.cryptosData &&
                            Object.keys(this.props.cryptosData)
                                .sort((a, b) => {
                                    let nameA = this.props.cryptosData[a].columns["0"].cryptoMarketCap;
                                    let nameB = this.props.cryptosData[b].columns["0"].cryptoMarketCap;
                                    if (nameA < nameB) {
                                        return 1;
                                    }
                                    if (nameA > nameB) {
                                        return -1;
                                    }
                                    return 0;
                                })
                                .map(crypto => (
                                    <CryptoRow
                                        key={this.props.cryptosData[crypto].cryptoId}
                                        cryptoInfo={this.props.cryptosData[crypto].cryptoId}
                                        cryptoIcon={this.props.cryptosData[crypto].cryptoIconUrl}
                                        cryptoName={this.props.cryptosData[crypto].cryptoName}
                                        columns={this.props.cryptosData[crypto].columns}
                                    />
                                ))}
                    </div>
                </div>
                <DataSelectorModal />
            </React.Fragment>
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
