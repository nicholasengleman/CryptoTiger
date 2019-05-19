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
        data_period: 20,
        data_name: "2 Hour Change",
        data_value: 200
      },
      "3": {
        data_id: 3,
        data_type: "price",
        data_period_type: "hourly",
        data_period: 30,
        data_name: "3 Hour Change",
        data_value: 300
      },
      "4": {
        data_id: 4,
        data_type: "price",
        data_period_type: "daily",
        data_period: 10,
        data_name: "1 daily Change",
        data_value: 100
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
        data_value: 3
      },
      "7": {
        data_id: 7,
        data_type: "volume",
        data_period_type: "current",
        data_period: 0,
        data_name: "current volume",
        data_value: 1
      },
      "8": {
        data_id: 8,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: 1
      },
      "9": {
        data_id: 9,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 2,
        data_name: "2 Hour Change",
        data_value: 2
      },
      "10": {
        data_id: 10,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 3,
        data_name: "3 Hour Change",
        data_value: 3
      },
      "11": {
        data_id: 11,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: 1
      },
      "12": {
        data_id: 12,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 2,
        data_name: "2 daily Change",
        data_value: 2
      },
      "13": {
        data_id: 13,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 4,
        data_name: "3 daily Change",
        data_value: 4
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
        data_value: 3
      },
      "4": {
        data_id: 4,
        data_type: "price",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: 1
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
        data_value: 3
      },
      "7": {
        data_id: 7,
        data_type: "volume",
        data_period_type: "current",
        data_period: 0,
        data_name: "current volume",
        data_value: -1
      },
      "8": {
        data_id: 8,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 1,
        data_name: "1 Hour Change",
        data_value: 100
      },
      "9": {
        data_id: 9,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 2,
        data_name: "2 Hour Change",
        data_value: 2
      },
      "10": {
        data_id: 10,
        data_type: "volume",
        data_period_type: "hourly",
        data_period: 3,
        data_name: "3 Hour Change",
        data_value: 3
      },
      "11": {
        data_id: 11,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "1 daily Change",
        data_value: 1
      },
      "12": {
        data_id: 12,
        data_type: "volume",
        data_period_type: "daily",
        data_period: 1,
        data_name: "2 daily Change",
        data_value: 2
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
