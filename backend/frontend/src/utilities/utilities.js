export const updatedObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const findCurrentValueOfCrypto = (data, crypto_id) => {
    const row = data.find(crypto => {
        return crypto.crypto_id === crypto_id;
    });
    return row.data_value;
};

export const filterCryptos = (cryptoData, filterParameters) => {
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
