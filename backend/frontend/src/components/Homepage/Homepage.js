import React, { Component } from "react";
import PropTypes from "prop-types";
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
        const { fetchSuccess, fetchFailure, updateCurrentData, setColumns } = this.props;
        axios
            .get("http://localhost:5000/api/crypto-data/getDefaultData")
            .then(response => {
                fetchSuccess(response.data);
                setColumns(response.data.length);
            })
            .catch(error => {
                fetchFailure(error);
                console.log("[Error]", error);
            });

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("currentDataUpdate", message => {
            updateCurrentData(message);
        });
    }

    render() {
        const { cryptosData } = this.props;
        return (
            <React.Fragment>
                <div className={styles.pageContainer}>
                    <div className={styles.hero}>
                        <PresetsContainer />
                    </div>
                    <div className={styles.cryptoTable}>
                        <CryptoListHeader />
                        {cryptosData &&
                            Object.keys(cryptosData)
                                .sort((a, b) => {
                                    let nameA = cryptosData[a].columns["0"].cryptoMarketCap;
                                    let nameB = cryptosData[b].columns["0"].cryptoMarketCap;
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
                                        key={cryptosData[crypto].cryptoId}
                                        cryptoInfo={cryptosData[crypto].cryptoId}
                                        cryptoIcon={cryptosData[crypto].cryptoIconUrl}
                                        cryptoName={cryptosData[crypto].cryptoName}
                                        columns={cryptosData[crypto].columns}
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
        fetchSuccess: data => dispatch(fetchCryptosSuccess(data)),
        fetchFailure: error => dispatch(fetchCryptosFailure(error)),
        setColumns: columns => dispatch(setColumns(columns))
    };
};

Homepage.propTypes = {
    cryptosData: PropTypes.array
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
