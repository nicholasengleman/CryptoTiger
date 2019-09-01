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
            if (filterParameter.column === crypto_all_data[crypto].columns[filterIndex + 1].name) {
                console.log("name match");
                if (filterParameter.parameters.selectionMin < parseFloat(crypto_all_data[crypto].columns[filterIndex + 1].value) &&
                    parseFloat(crypto_all_data[crypto].columns[filterIndex + 1].value) < filterParameter.parameters.selectionMax) {
                    console.log("condition met");
                    filtered_cryptos.push(crypto_all_data[crypto]);
                }
            } else {
              //need to load new data from the server and then filter that data
            }
        });
    });

    console.log(filtered_cryptos);

// return crypto_data;
};



