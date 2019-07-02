
function computeDataId(timeframe, barTime, DATA_INFO_MAP, callback) {
    if (timeframe === "hour") {
        let period =
            Math.floor(
                (new Date() - new Date(barTime * 1000)) / 1000 / 60 / 60
            ) + 1;

        callback(null, DATA_INFO_MAP["price"]["hour"][period].data_id);
    }

    if (timeframe === "day") {
        let period =
            Math.floor(
                (new Date() - new Date(barTime * 1000)) / 1000 / 60 / 60 / 24
            ) + 1;

        callback(null, DATA_INFO_MAP["price"]["day"][period].data_id);
    }
}


module.exports = computeDataId;