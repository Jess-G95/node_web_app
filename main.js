var http = require("http");

const express = require('express')
const app = express();
const port = 3000;
const path = require("path");

// Import Routes for API (Phil stuff)
let apiRoutes = require("./api-routes")

// Use api routes in the app
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/jjp', (req, res) => {
  res.sendFile('main.html', { root: __dirname });
});

app.get('/location.js', (req, res) => {
  res.sendFile('location.js', { root: __dirname });
});

app.get('/location', (req, res) => {
  res.sendFile('location.html', { root: __dirname });
});

app.get('/pokemon.js', (req, res) => {
  res.sendFile('pokemon.js', { root: __dirname });
});

app.get('/pokemon.css', (req, res) => {
  res.sendFile('pokemon.css', { root: __dirname });
});

app.get('/pokemon', (req, res) => {
  res.sendFile('pokemon.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});