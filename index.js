const express = require("express");
const app = express();
const port = 8001;
const axios = require("axios");
const cors = require("cors");

app.use(cors({ credentials: true }));
app.get("/", (req, res) => {
  res.send("Good Morning");
});

app.get("/currency", (req, res) => {
  // tmp
  const amt = req.query.amt ? req.query.amt : 100;
  const targetCurrency =
    req.query.sym && typeof req.query.sym == "string" ? req.query.sym : "AUD";
  const baseCurrency =
    req.query.base && typeof req.query.base == "string"
      ? req.query.base
      : "EUR";
  //   console.log(req.query);
  axios
    .get(
      `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${targetCurrency}`
    )
    .then(response => {
      if (response.data) {
        res.send({
          amt: Number((amt * response.data.rates[targetCurrency]).toFixed(2))
        });
      } else {
        res.send("Error getting data");
      }
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server up running and listening to port ${port}`);
  }
});
