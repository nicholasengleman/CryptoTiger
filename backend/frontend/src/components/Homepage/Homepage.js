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
    setColumns,
    storePresetData
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
        const { fetchSuccess, fetchFailure, updateCurrentData, presetsData, storePresetData, setColumns } = this.props;

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

        presetsData.presets.forEach(preset => {
            let data = [];
            preset.columns.forEach(column => {
                axios
                    .get(`http://localhost:5000/api/crypto-data/getColumnData/${column.time}`)
                    .then(response => {
                        data.push(response.data);
                        if (data.length === preset.columns.length) {
                            storePresetData(preset.id, data);
                        }
                    })
                    .catch(error => {
                        console.log("[Error]: ", error);
                    });
            });
        });

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("currentDataUpdate", message => {
            updateCurrentData(message);
        });
    }

    render() {
        const { cryptosData } = this.props;
        const { sortColumn, sortDown } = this.props.sortData;
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
                                    let nameA = 0;
                                    let nameB = 0;
                                    if (sortColumn === 0) {
                                        nameA = cryptosData[a].columns["0"].cryptoMarketCap;
                                        nameB = cryptosData[b].columns["0"].cryptoMarketCap;
                                        return nameA - nameB;
                                    } else {
                                        nameA = cryptosData[a].columns[sortColumn].cryptoRawPercentChange;
                                        nameB = cryptosData[b].columns[sortColumn].cryptoRawPercentChange;
                                        if (sortDown) {
                                            return nameA - nameB;
                                        } else {
                                            return nameB - nameA;
                                        }
                                    }
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
        cryptosData: selectFilteredCryptos(state.cryptoData.data, state.filterData.filterParameters),
        presetsData: state.presetsData,
        sortData: state.cryptoData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentData: data => dispatch(updateCurrentData(data)),
        fetchSuccess: data => dispatch(fetchCryptosSuccess(data)),
        fetchFailure: error => dispatch(fetchCryptosFailure(error)),
        setColumns: columns => dispatch(setColumns(columns)),
        storePresetData: (presetId, presetData) => dispatch(storePresetData(presetId, presetData))
    };
};

Homepage.propTypes = {
    cryptosData: PropTypes.object,
    processPresetData: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
