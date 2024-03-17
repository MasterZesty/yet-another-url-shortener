const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs');

const app = express()
const port = 3000

const hostname = "http://127.0.0.1"

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  const url = '';
  const alias = '';
  const method = 'GET';
  const errorMessage = '';
  const yasu = '';
  res.render('url_shortner', {url, alias, method, errorMessage, yasu});
});

app.post('/', (req, res) => {
  const { url, alias } = req.body;
  const method = "POST"

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      "original_url": url,
      "custom_alias": alias
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/api/v1/shorten", requestOptions)
      .then(response => response.json())
      .then(result => {
          if (result.status === "success") {
            const errorMessage = "Shortened URL created successfully  : "
            const yasu = url + alias // this url should be host url not this url
            res.render('url_shortner', {url, alias, method, errorMessage, yasu});
          }
      })
      .catch(error => {
          console.error('Error:', error);
          const errorMessage = "Failed to create shortened URL   ";
          const yasu = ''
          res.render('url_shortner', {url, alias, method, errorMessage, yasu});
      });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})