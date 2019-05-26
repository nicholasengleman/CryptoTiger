const cryptos = [
  {
    id: 1,
    name: "Etherum",
    industry: "main",
    marketcap: "$300B",
    data: {
      "0": {
        data_id: 0,
        data_type: "price",
        data_period_type: "current",
        data_period: 0,
        data_name: "current price",
        data_value: 2342342
      },
      "1": {
        data_id: 1,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: -123
      },
      "2": {
        data_id: 2,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: -123123
      },
      "20": {
        data_id: 20,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: -123
      },
      "21": {
        data_id: 21,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: -123123
      },
      "23": {
        data_id: 23,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: -123
      },
      "24": {
        data_id: 24,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: -123123
      },
      "25": {
        data_id: 25,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: -123
      },
      "26": {
        data_id: 26,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: -123123
      },
      "27": {
        data_id: 28,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 30,
        data_name: "3 Hour Change",
        data_value: 68678
      },
      "28": {
        data_id: 28,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: -123
      },
      "30": {
        data_id: 30,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: -123123
      },
      "29": {
        data_id: 29,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 30,
        data_name: "3 Hour Change",
        data_value: 68678
      },
      "4": {
        data_id: 4,
        data_type: "price",
        data_period_type: "daily",
        data_period: 10,
        data_name: "1 daily Change",
        data_value: 3453
      },
      "5": {
        data_id: 5,
        data_type: "price",
        data_period_type: "daily",
        data_period: 2,
        data_name: "2 daily Change",
        data_value: 234984
      },
      "6": {
        data_id: 6,
        data_type: "price",
        data_period_type: "daily",
        data_period: 3,
        data_name: "3 daily Change",
        data_value: -9789
      },
      "7": {
        data_id: 7,
        data_type: "volume",
        data_period_type: "current",
        data_period: 0,
        data_name: "current volume",
        data_value: 375712
      },
      "8": {
        data_id: 8,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: 98734
      },
      "9": {
        data_id: 9,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 2,
        data_name: "2 Hour Change",
        data_value: 12331
      },
      "10": {
        data_id: 10,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 3,
        data_name: "3 Hour Change",
        data_value: -3126
      },
      "11": {
        data_id: 11,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: 7892
      },
      "12": {
        data_id: 12,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 2,
        data_name: "2 daily Change",
        data_value: 2125
      },
      "13": {
        data_id: 13,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 4,
        data_name: "3 daily Change",
        data_value: 9674
      }
    }
  },
  {
    id: 2,
    name: "Bitcoin",
    industry: "main",
    marketcap: "$300B",
    data: {
      "0": {
        data_id: 0,
        data_type: "price",
        data_period_type: "current",
        data_period: 0,
        data_name: "current price",
        data_value: 1
      },
      "1": {
        data_id: 1,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: 1
      },
      "2": {
        data_id: 2,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 2,
        data_name: "2 Hour Change",
        data_value: 2
      },
      "3": {
        data_id: 3,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 3,
        data_name: "3 Hour Change",
        data_value: 2342
      },
      "4": {
        data_id: 4,
        data_type: "price",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: -123
      },
      "5": {
        data_id: 5,
        data_type: "price",
        data_period_type: "daily",
        data_period: 2,
        data_name: "2 daily Change",
        data_value: 2
      },
      "6": {
        data_id: 6,
        data_type: "price",
        data_period_type: "daily",
        data_period: 3,
        data_name: "3 daily Change",
        data_value: -89898
      },
      "7": {
        data_id: 7,
        data_type: "volume",
        data_period_type: "current",
        data_period: 0,
        data_name: "current volume",
        data_value: -1234
      },
      "8": {
        data_id: 8,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: 2433
      },
      "9": {
        data_id: 9,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 2,
        data_name: "2 Hour Change",
        data_value: 835
      },
      "10": {
        data_id: 10,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 3,
        data_name: "3 Hour Change",
        data_value: -2349834
      },
      "11": {
        data_id: 11,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: 123
      },
      "12": {
        data_id: 12,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "2 daily Change",
        data_value: 8768
      },
      "13": {
        data_id: 13,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 4,
        data_name: "3 daily Change",
        data_value: 3
      }
    }
  }
];

export function getAllCryptos() {
  return cryptos;
}

export function getDefaultColumns() {
  return [
    cryptos[0].data["0"],
    cryptos[0].data["7"],
    cryptos[0].data["8"],
    cryptos[0].data["5"]
  ];
}
