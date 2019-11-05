export const updatedObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const findCurrentValueOfCrypto = (data, cryptoId) => {
    const row = data.find(crypto => {
        return crypto.cryptoId === cryptoId;
    });
    return row.columns[0].cryptoValue;
};
