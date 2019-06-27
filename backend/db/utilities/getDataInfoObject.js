const connection = require("./../db");
const util = require('util');

const getDataInfoObject = callback => {
    let sql =
        "SELECT data_id, data_name, data_period_type, data_period, data_type FROM DataInfo";
    connection.query(sql, function (error, results = "") {
        if (error) {
            callback(error);
        } else {
            let DATA_ID_MAP = {};

            results.forEach(function (tf) {
                DATA_ID_MAP = {
                    ...DATA_ID_MAP,
                    [tf.data_type] : {
                       ...DATA_ID_MAP[tf.data_type],
                       [tf.data_period_type] : {
                           ...(DATA_ID_MAP[tf.data_type] && DATA_ID_MAP[tf.data_type][tf.data_period_type]),
                           [tf.data_period] : {
                               'data_id' : tf.data_id,
                               'data_name' : tf.data_name
                           }
                       }
                    }
                }
            });
            callback(null, DATA_ID_MAP);
        }
    });
};


module.exports = getDataInfoObject;


