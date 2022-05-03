const axios = require('axios');
const path = require('path');
const express = require('express');
require('dotenv').config();

const { PORTCLI, TOKEN } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  const { method } = req;
  const url = `http://localhost:3000${req.originalUrl}`;
  const headers = { Authorization: TOKEN };
  const data = req.body;
  axios({
    method, url, headers, data,
  }).then((result) => { res.send(result.data); })
    .catch((err) => res.send(err));
});

app.listen((PORTCLI), () => {
  console.log(`client listening on port ${PORTCLI}!`);
});
