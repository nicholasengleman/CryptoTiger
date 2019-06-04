//1) get common data working first
//2) then build in functions to compute the uncommon data

const map = {
  //common price data - use 1000 - 1999 for ids
  PRICE: { id: 1000, data_name: "Last Price", data_type: "price" },
  CHANGEPCT24HOUR: { id: 1001, data_name: "24H %", data_type: "price" },

  //common volumn data - use 2000 - 2999 for ids
  LASTVOLUME: { id: 2000, data_name: "Last Volume", data_type: "volume" }
};

function getPeriodsFromAPI(data) {
  let new_data = [];

  Object.keys(data[0].RAW.USD).forEach(key => {
    if (key in map) {
      let data = map[key];
      new_data.push(data);
    }
  });

  // let newCrypoObject = {
  //   info: crypto.CoinInfo,
  //   data:
  // };
  // new_data.push(newCrypoObject);

  // console.log(JSON.stringify(data[0], null, 4));
  console.log(JSON.stringify(new_data, null, 4));
}

module.exports = { getPeriodsFromAPI };
