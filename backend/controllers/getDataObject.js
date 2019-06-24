const dataObject  = require("./../db/utilities/getDataInfoObject");

function getDataObject (callback) {
    dataObject(function(err, data) {
        if(err) throw err;
        callback(data);
    })
}

module.exports = getDataObject;