import { createSelector } from "reselect";

const cryptoData = state => state.cryptoData.data;
const filterParameters = state => state.filterData.filterParameters;

export default createSelector(
    [cryptoData, filterParameters],
    (cryptoData, filterParameters) => {
        if (filterParameters.length === 0) {
            return cryptoData;
        }
        let cryptos = [];
        Object.keys(cryptoData).forEach(crypto => {
            let filterPasses = 0;

            filterParameters.forEach(filter => {
                Object.keys(cryptoData[crypto].columns).forEach(column => {
                    if (cryptoData[crypto].columns[column].columnId === filter.columnId) {
                        if (
                            filter.parameters.selectionMin <
                                parseFloat(cryptoData[crypto].columns[column].cryptoPercentChange) &&
                            parseFloat(cryptoData[crypto].columns[column].cryptoPercentChange) <
                                filter.parameters.selectionMax
                        ) {
                            filterPasses++;
                        }
                    }
                });
            });

            if (filterPasses === filterParameters.length) {
                cryptos.push(cryptoData[crypto]);
            }
        });
        return cryptos;
    }
);
