const selectHistogramCryptos = (data, nameOfSelectedColumn) => {
    let histogramData = [];

    for (let crypto in data) {
        Object.keys(data[crypto].columns).forEach(column => {
            if (column.name === nameOfSelectedColumn) {
                histogramData.push({
                    id: column.crypto_id,
                    value: Number(column.crypto_value),
                    tooltip: {
                        name: data[crypto].crypto_name,
                        value: column.crypto_value
                    }
                });
            }
        });
    }
    return histogramData;
};

export default selectHistogramCryptos;
