const connection = require("./../utilities/db");
const getCurrentVolume = require("./../utilities/getCurrentVolume");
const DATA_INFO_OBJECT = require("./../utilities/DataInfoObject");
const getCryptoListTable = require("./../utilities/getCryptoListTable");

function updateCurrentVolumeData(callback) {
    getCurrentVolume((err, cryptos) => {
        if (err) throw err;

        updateDataInTable(cryptos, (err, cryptoList) => {
            if (err) throw err;
            callback(cryptoList);
        });
    });
}

function updateDataInTable(cryptos, callback) {
    getCryptoListTable((err, CRYPTO_LIST_TABLE) => {

        let data_types = Object.keys(cryptos[0]).filter(el => {
            return el !== 'shortname';
        });

        data_types.forEach(data_type => {
            let cryptoList = [];

            cryptos.forEach(crypto => {
                // const data_id = DATA_INFO_OBJECT["Price"];
                const crypto_id = CRYPTO_LIST_TABLE[crypto.shortname].crypto_id;

                cryptoList.push([crypto.volume, 0, crypto_id]);
            });


            let sql = `UPDATE crypto_volume_current
                       SET data_value = ?
                       WHERE data_id = ?
                         AND crypto_id = ?`;

            for (let i = 0; i < cryptoList.length; i++) {
                connection.query(sql, cryptoList[i], function (error, results) {
                    if (error) {
                        callback(error);
                    }
                });
            }

            console.log(`Finished updating current ${data_type} data.`);
            callback(null, cryptoList);
        });
    });
}


updateCurrentVolumeData((data) => {
    console.log(data);
});

module.exports = updateCurrentVolumeData;


