const connection = require("../../../utilities/db");
const getCurrentPrice = require("../../utilities/getCurrentPrice");
const prepareCurrentData = require("../../utilities/processCurrentPriceData");

function updateCurrentPrice() {
    getCurrentPrice((err, cryptos) => {
        if (err) throw err;
        updateDataInTable(cryptos, err => {
            if (err) throw err;
        });
    });
}

function updateDataInTable(cryptos, callback) {
    let data_types = Object.keys(cryptos[0]).filter(el => {
        return el !== 'shortname';
    });

    data_types.forEach(data_type => {
        prepareCurrentData("update", cryptos, data_type, (err, cryptoList) => {
            if (err) {
                throw err;
            } else {
                let sql = "UPDATE CryptoNumberDataValues SET data_value = ? WHERE data_id = ? AND crypto_id = ?";
                for (let i = 0; i < cryptoList.length; i++) {
                    connection.query(sql, cryptoList[i], function (error, results) {
                        if (error) {
                            callback(error);
                        }
                    });
                }
            }
            console.log(`Finished updating current ${data_type} data.`);
        })
    })
}


module.exports = updateCurrentPrice;
