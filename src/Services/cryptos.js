const cryptos = [
  {
    id: 1,
    name: "Etherum",
    industry: "main",
    marketcap: "$300B",
    priceData: {
      price: 2,
      minute: {
        "5m": "1"
      },
      hour: {
        "1h": "10"
      },
      day: {
        "7d": "-20"
      },
      month: {
        "6m": "200"
      }
    },
    volumeData: {
      volume: 1,
      minute: {
        "5m": "1"
      },
      hour: {
        "1h": "10"
      },
      day: {
        "7d": "-14"
      },
      month: {
        "6m": "200"
      }
    }
  },
  {
    id: 2,
    name: "Bitcoin",
    industry: "main",
    marketcap: "$300B",
    priceData: {
      price: 2,
      minute: {
        "5m": "1"
      },
      hour: {
        "1h": "10"
      },
      day: {
        "7d": "20"
      },
      month: {
        "6m": "200"
      }
    },
    volumeData: {
      volume: 10,
      minute: {
        "5m": "1"
      },
      hour: {
        "1h": "10"
      },
      day: {
        "7d": "45"
      },
      month: {
        "6m": "200"
      }
    }
  }
];

export function getAllCryptos() {
  return cryptos;
}
