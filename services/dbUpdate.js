function getCryptoNumberValues() {
  const request = axios
    .get(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&?" +
        api_key +
        ""
    )
    .then(response => {
      return response.data.Data;
    })
    .catch(error => {
      console.log(error);
    });

  request.then(data => {
    data.forEach(coin => {
      let coinPriceInfo = {
        id: coin.CoinInfo.Id,
        data_id: 1,
        data_value: coin["RAW"]["USD"]["PRICE"]
      };
      let coinMktInfo = {
        id: coin.CoinInfo.Id,
        data_id: 2,
        data_value: coin["RAW"]["USD"]["MKTCAP"]
      };
      cryptoStringDataValues.push(coinPriceInfo, coinMktInfo);
    });

    console.log(JSON.stringify(cryptoStringDataValues, null, 4));
  });
}
