const connection = require("./../db");
const util = require('util');

function getDataInfoObject(callback) {
    let sql =
        "SELECT data_id, data_name, data_period_type, data_period, data_type FROM DataInfo";
    connection.query(sql, function (error, results) {
        if (error) {
            callback(error);
        } else {
            let DATA_ID_MAP = {};

            // let id = results.filter(function (data) {
            //     return data.data_type === "price" && data.data_period_type === timeframe && data.data_period === period;
            // });
            //
            // callback(null, id[0].data_id);

            results.forEach(function (tf) {
                DATA_ID_MAP = {
                    ...DATA_ID_MAP,
                    [tf.data_type] : {
                       ...DATA_ID_MAP[tf.data_type],
                       [tf.data_period_type] : {
                           ...(DATA_ID_MAP[tf.data_type] && DATA_ID_MAP[tf.data_type][tf.data_period_type]),
                           [tf.data_period] : tf.data_id
                       }
                    }
                }
            });


            callback(null, DATA_ID_MAP);
        }
    });
}


module.exports = getDataInfoObject;


