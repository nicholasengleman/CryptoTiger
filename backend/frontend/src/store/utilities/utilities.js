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
    return row.columns[0].crypto_value;
};
