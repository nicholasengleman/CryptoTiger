import React from "react";
import styles from "./CryptoListHeader.module.scss";

import {connect} from "react-redux";

import CryptoHeader from "./CryptoHeader/CryptoHeader";
import AddNewColumnBtn from "./AddNewColumnBtn/AddNewColumnBtn";

const CryptoListHeader = props => {

    const findFilter = timeframe_name => {
        return props.filters.find(filter => {
            return filter.column === timeframe_name;
        })
    };

    return (
        <div className={styles.filterColumnsHeader}>
            <div className={styles.spacer}/>

            {props.crypto &&
            props.crypto.columns.map((timeframe, index) => (
                <CryptoHeader key={index} column_name={timeframe.name} filter={findFilter(timeframe.name)}/>
            ))}
            <AddNewColumnBtn/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        crypto: state.cryptoData.allData["1182"],
        filters: state.cryptoData.filterParameters
    };
};

export default connect(mapStateToProps)(CryptoListHeader);
