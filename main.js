var http = require("http");

const express = require('express')
const app = express();
const port = 3000;
const path = require("path");

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/jjp', (req, res) => {
  res.sendFile('main.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});