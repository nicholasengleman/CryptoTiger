import React, {
    Component
} from "react";
import PropTypes from "prop-types";
import {
    connect
} from "react-redux";

import selectFilteredCryptos from "../../store/selectors/selectFilteredCryptos";
import socketIOClient from "socket.io-client";

import {
    updateCurrentData,
    updateTopChartData,
    fetchAllCryptoData,
    fetchPresetData
} from "../../store/actions/actionCreators";

import styles from "./Homepage.module.scss";

import CryptoRow from "../CryptoTableRow/CryptoTableRow";
import CryptoListHeader from "../CryptoTableHeader/CryptoTableHeader";
import DataSelectorModal from "../DataSelectorModal/DataSelectorModal";
import PresetsContainer from "../PresetsContainer/PresetsContainer";
import Chart from "../Chart/Chart";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://155.138.162.49:5000/"
        };
    }

    componentDidMount() {
        const {
            updateCurrentData,
            updateTopChartData,
            fetchAllCryptoData,
            fetchPresetData
        } = this.props;
        fetchAllCryptoData();
        fetchPresetData();

        const {
            endpoint
        } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("currentDataUpdate", message => {
            updateCurrentData(message);
            updateTopChartData(message);
        });
    }

    render() {
        const {
            cryptosData
        } = this.props;
        const {
            sortColumn,
            sortDown
        } = this.props.sortData;
        return ( <
            React.Fragment >
            <
            div className = {
                styles.pageContainer
            } >
            <
            div className = {
                styles.hero
            } >
            <
            Chart / >
            <
            PresetsContainer / >
            <
            /div> <
            div className = {
                styles.cryptoTable
            } >
            <
            CryptoListHeader / > {
                cryptosData &&
                Object.keys(cryptosData)
                .sort((a, b) => {
                    let nameA = 0;
                    let nameB = 0;
                    if (sortColumn === 0) {
                        nameA =
                            cryptosData[a].columns["0"]
                            .cryptoMarketCap;
                        nameB =
                            cryptosData[b].columns["0"]
                            .cryptoMarketCap;
                        return nameA - nameB;
                    } else {
                        if (
                            cryptosData[a].columns[sortColumn]
                        ) {
                            nameA =
                                cryptosData[a].columns[
                                    sortColumn
                                ].cryptoRawPercentChange;
                            nameB =
                                cryptosData[b].columns[
                                    sortColumn
                                ].cryptoRawPercentChange;
                            if (sortDown) {
                                return nameA - nameB;
                            } else {
                                return nameB - nameA;
                            }
                        }
                        return 0;
                    }
                })
                .map(crypto => ( <
                    CryptoRow key = {
                        cryptosData[crypto].cryptoId
                    }
                    cryptoInfo = {
                        cryptosData[crypto].cryptoId
                    }
                    cryptoIcon = {
                        cryptosData[crypto].cryptoIconUrl
                    }
                    cryptoName = {
                        cryptosData[crypto].cryptoName
                    }
                    columns = {
                        cryptosData[crypto].columns
                    }
                    />
                ))
            } <
            /div> <
            /div> {
                this.props.dataMenuData.dataMenu.open ? ( <
                    DataSelectorModal / >
                ) : (
                    document.body.classList.remove("MODAL_OPEN_CLASS")
                )
            } <
            /React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cryptosData: selectFilteredCryptos(state),
        sortData: state.cryptoData,
        dataMenuData: state.dataMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentData: data => dispatch(updateCurrentData(data)),
        updateTopChartData: data => dispatch(updateTopChartData(data)),
        fetchAllCryptoData: () => dispatch(fetchAllCryptoData()),
        fetchPresetData: () => dispatch(fetchPresetData())
    };
};

Homepage.propTypes = {
    processPresetData: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);