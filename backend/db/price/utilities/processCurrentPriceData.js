const getCryptoListTable = require("../../utilities/getCryptoListTable");
const getDataInfoTable = require("../../utilities/getDataInfoTable");

function processCurrentPriceData(type_of_operation, cryptos, data_type, callback) {

    if (type_of_operation !== "insert" && type_of_operation !== "update") {
        return callback("Unknown operation type for preparing data.")
    }

    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {
        getDataInfoTable((err, DATA_INFO_TABLE) => {
            let cryptoList = [];

            cryptos.forEach(crypto => {
                const data_id = DATA_INFO_TABLE[data_type].current["0"].data_id;
                const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;

                switch (type_of_operation) {
                    case "insert":
                        cryptoList.push([data_id, crypto_id, crypto.price]);
                        break;
                    case "update":
                        cryptoList.push([crypto.price, data_id, crypto_id]);
                        break;
                    default:
                        callback("Unknown operation type for preparing data.");
                        break;
                }
            });
            callback(null, cryptoList);
        });
    });
}


module.exports = processCurrentPriceData;