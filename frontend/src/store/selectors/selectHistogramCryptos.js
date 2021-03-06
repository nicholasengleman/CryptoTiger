import { createSelector } from "reselect";

const data = state => state.cryptoData.dataBuffer;
const selectedColumnId = state => state.selectedData.selectedColumnId;

export default createSelector(
    [data, selectedColumnId],
    (data, selectedColumnId) => {
        let histogramData = [];

        for (let crypto in data) {
            Object.keys(data[crypto].columns).forEach(column => {
                if (data[crypto].columns[column].columnId === selectedColumnId) {
                    histogramData.push({
                        id: data[crypto].cryptoId,
                        value: Number(data[crypto].columns[column].cryptoPercentChange),
                        tooltip: {
                            name: data[crypto].cryptoName,
                            value: data[crypto].columns[column].cryptoPercentChange
                        }
                    });
                }
            });
        }

        return histogramData;
    }
);
