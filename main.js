const express = require('express')
const app = express();
const port = 3000;

let quotesDiv = document.getElementById('quotes')
fetch('https://api.kanye.rest')
.then(res => res.json())
.then(quote => {
    quotesDiv.innerHTML += `<p> ${quote.quote} </p>`
})

app.get('/', (req, res) => {
  res.send(quotesDiv)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});