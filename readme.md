Database Setup
db.actions.dbsetup.index();

insert Price Data
dbUpdate.getUpdateCryptoNumberValues();

##Data Load Procedure/Schema
Step 1:

- crypto data is pulled to client as a flat array from db. Array has this schema:
  [
  [data_id, crypto_id, data_value]
  ]

- client proccess array and turns it into an array of objects with this schema:
  const cryptos = [
  {
  crypto_id: x,
  crypto_name: x,
  data : {
  data_id {
  data_id: x,
  data_type: x,
  data_period_type: x,
  data_period: x,
  data_name: x,
  data_value: x
  },
  data_id {
  data_id: x,
  data_type: x,
  data_period_type: x,
  data_period: x,
  data_name: x,
  data_value: x
  }
  }
  },
  {
  crypto_id: x,
  crypto_name: x,
  data : {
  data_id {
  data_id: x,
  data_type: x,
  data_period_type: x,
  data_period: x,
  data_name: x,
  data_value: x
  },
  data_id {
  data_id: x,
  data_type: x,
  data_period_type: x,
  data_period: x,
  data_name: x,
  data_value: x
  }
  }
  }
  ]

Crypto Objects are then sorted by one of the data id/data_values

Step 2:
The new array kept in the redux store. It is fed to the Homepage component which iterates over it and creates a CryptoRow componenet for each object(which represents each crypto) in the array.

The CryptoRow component also receives an array of keys that describes the data ids for each column. The array has this schema:
[data_id, data_id]

Step 3:
The CryptoRow Component iterates over the column array and uses the data_id keys to look the value in the crypto.data object to show.

The value of each cell will be crypto.data[data_id].data_value;
