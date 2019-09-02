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

export const filterCryptos = (crypto_all_data, filterParameters) => {
    let filtered_cryptos = [];

    filterParameters.forEach((filterParameter, filterIndex) => {

        Object.keys(crypto_all_data).forEach(crypto => {
          // For filtering data that is already loaded.

          // Each position in the filter array is for it's applicable column
          // example: filter object at filterParameters[0] is for the 1st column(column count starts at the column
          // after the "current price" column because it is not editable)

            for(let col = 0; col < crypto_all_data[crypto].columns.length; col++) {
                if (filterParameter.column === crypto_all_data[crypto].columns[col].name) {
                    if (filterParameter.parameters.selectionMin < parseFloat(crypto_all_data[crypto].columns[filterIndex + 1].crypto_value) &&
                        parseFloat(crypto_all_data[crypto].columns[col].crypto_value) < filterParameter.parameters.selectionMax) {
                        if(!filtered_cryptos.find(el => el.crypto_id === crypto_all_data[crypto].columns[filterIndex + 1].crypto_id)) {
                            filtered_cryptos.push(crypto_all_data[crypto]);
                        }
                    }
                }
            }
        });
    });

    console.log(filtered_cryptos);
    return filtered_cryptos;
};



