const cryptos = [
  {
    id: 1,
    name: "Etherum",
    industry: "main",
    marketcap: "$300B",
    priceData: {
      current: {
        zero: { data_name: "current price", data_value: 2 }
      },
      hourly: {
        one: { data_name: "1 hour change", data_value: 2 },
        two: { data_name: "2 hour change", data_value: 2 },
        four: { data_name: "3 hour change", data_value: 2 }
      },
      daily: {
        one: { data_name: "1 daily change", data_value: 2 },
        two: { data_name: "2 daily change", data_value: 2 },
        four: { data_name: "3 daily change", data_value: 2 }
      }
    }
  }
];

export function getAllCryptos() {
  return cryptos;
}

export function getDefaultColumns() {
  return [
    {
      data_name: cryptos[0].priceData.current.data_name,
      data_type: "priceData",
      data_price_period_type: "current",
      data_price_period: "zero"
    }
    // {
    //   data_name: cryptos[0].priceData.daily.one.data_name,
    //   data_location: "props.priceData.daily.one.data_value"
    // }
  ];
}
