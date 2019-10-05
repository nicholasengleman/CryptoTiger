const selectFilteredCryptos = (cryptoData, filterParameters) => {
    if(filterParameters.length === 0) {
        return cryptoData;
    }

    let cryptos = [];
    Object.keys(cryptoData).forEach(crypto => {
        let filterPasses = 0;

        filterParameters.forEach(filter => {
            cryptoData[crypto].columns.forEach(column => {
                if (column.columnId === filter.columnId) {
                    if (
                        filter.parameters.selectionMin < parseFloat(column.crypto_value) &&
                        parseFloat(column.crypto_value) < filter.parameters.selectionMax
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
};

export default selectFilteredCryptos;