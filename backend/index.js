const port = process.env.PORT || 5000;

//inject router with middleware
import "./beforeMiddleware";

import app from "./app";

app.get("/api/updatecryptos", cors(), (req, res, next) => {
  clientUpdate.updateCryptoData(function(result) {
    res.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
