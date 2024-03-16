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
  const method = "GET"
  res.render('url_shortner', {url, alias, method});
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
              // console.log(result)
              errorMessage.textContent = `Shortened URL created successfully!`;
              errorMessage.classList.remove('text-red-600');
              errorMessage.classList.add('text-green-600');
              // console.log("Shortened URL created successfully:", result.data.url);
          }
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle error scenarios if needed
      });

  res.render('url_shortner', {url, alias, method});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function shortenUrl() {
  const urlInput = document.getElementById('original_url');
  const urlValue = urlInput.value;
  const aliasInput = document.getElementById('alias');
  const aliasValue = aliasInput.value;
  const errorMessage = document.getElementById('error_msg')

  // if (!urlValue || !aliasValue) {
  //     errorMessage.textContent = `Please provide both url and alias.`;
  //     errorMessage.classList.remove('text-green-600');
  //     errorMessage.classList.add('text-red-600');
  //     // console.error("Please provide both original_url and alias parameters.");
  //     return;
  // }

  return;
  
}