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

    filterParameters.forEach((filter, filterIndex) => {
        Object.keys(crypto_data).forEach(crypto => {
            for (let col = 0; col < crypto_data[crypto].columns.length; col++) {
                if (
                    filter.columnId ===
                    crypto_data[crypto].columns[col].columnId
                ) {
                    console.log("fired");
                    if (Object.entries(filter.parameters).length === 0) {
                        filtered_cryptos.push(crypto_data[crypto]);
                    } else {
                        if (
                            filter.parameters.selectionMin <
                                parseFloat(
                                    crypto_data[crypto].columns[filterIndex + 1]
                                        .crypto_value
                                ) &&
                            parseFloat(
                                crypto_data[crypto].columns[col].crypto_value
                            ) < filter.parameters.selectionMax
                        ) {
                            if (
                                !filtered_cryptos.find(
                                    el =>
                                        el.crypto_id ===
                                        crypto_data[crypto].columns[
                                            filterIndex + 1
                                        ].crypto_id
                                )
                            ) {
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
