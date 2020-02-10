const express = require("express");
const app = express();
const port = 8001;
const axios = require("axios");

app.get("/", (req, res) => {
  res.send("Good Morning");
});

app.get("/currency", (req, res) => {
  axios
    .get("https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD")
    .then(response => {
      res.send(response.data);
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
