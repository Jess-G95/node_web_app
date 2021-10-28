var http = require("http");

const express = require('express')
const app = express();
const port = 3000;
const path = require("path");

app.get('/', (req, res) => {
  //res.send('Hello World!')
  function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(allpokemon => console.log(allpokemon))
  }
});

app.get('/jjp', (req, res) => {
  res.sendFile(path.join(public, "main.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});