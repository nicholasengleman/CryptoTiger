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

export const filterCryptos = (crypto_data, filterParameters) => {
    let filtered_cryptos = [];

    filterParameters.forEach((filterParameter, filterIndex) => {
        Object.keys(crypto_data).forEach(crypto => {
            for (let col = 0; col < crypto_data[crypto].columns.length; col++) {
                if (filterParameter.column === crypto_data[crypto].columns[col].name) {
                    if (Object.entries(filterParameter.parameters).length === 0) {
                        filtered_cryptos.push(crypto_data[crypto]);
                    } else {
                        if (
                            filterParameter.parameters.selectionMin < parseFloat(crypto_data[crypto].columns[filterIndex + 1].crypto_value) &&
                            parseFloat(crypto_data[crypto].columns[col].crypto_value) < filterParameter.parameters.selectionMax
                        ) {
                            if (!filtered_cryptos.find(el => el.crypto_id === crypto_data[crypto].columns[filterIndex + 1].crypto_id)) {
                                filtered_cryptos.push(crypto_data[crypto]);
                            }
                        }
                    }
                }
            }
        });
    });
    return filtered_cryptos;
};
