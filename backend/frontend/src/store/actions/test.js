let cryptos = [
  {
    crypto_id: 1182,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 138333000000
  },
  {
    crypto_id: 3808,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 6871230000
  },
  {
    crypto_id: 5031,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 41716600000
  },
  {
    crypto_id: 7605,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 26334400000
  },
  {
    crypto_id: 166503,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 6443730000
  },
  {
    crypto_id: 202330,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 7012670000
  },
  {
    crypto_id: 204788,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 4396280000
  },
  {
    crypto_id: 431235,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 6244130000
  },
  {
    crypto_id: 926591,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 3448020000
  },
  {
    crypto_id: 929418,
    data_id: "MKCAP_CURRENT_0",
    data_name: "Current Market Cap",
    data_period_type: "current",
    data_period: 0,
    data_type: "misc",
    data_value: 6454780000
  },
  {
    crypto_id: 1182,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 7795.63
  },
  {
    crypto_id: 3808,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 110.63
  },
  {
    crypto_id: 5031,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 0.4172
  },
  {
    crypto_id: 7605,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 247.54
  },
  {
    crypto_id: 166503,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 6.35
  },
  {
    crypto_id: 202330,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 393.44
  },
  {
    crypto_id: 204788,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 31.1405
  },
  {
    crypto_id: 431235,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 0.188654
  },
  {
    crypto_id: 926591,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 193.47
  },
  {
    crypto_id: 929418,
    data_id: "PRICE_CURRENT_0",
    data_name: "Current Price",
    data_period_type: "current",
    data_period: 0,
    data_type: "price",
    data_value: 0.0645478
  }
];

let columns_processed = 
let id ="";

cryptos.forEach(function(item) {
    if(!id) {
        id = item.crypto_id;
    }

    let data = {
        data_id: [item.data_id],
        data_name: [item.data_name],
        data_period_type: [item.data_period_type],
        data_period: [item.data_period],
        data_type: [item.data_type],
        data_value: item.data_value
      }
    
    columns_processed.push(data);
});

console.log(columns_processed);
