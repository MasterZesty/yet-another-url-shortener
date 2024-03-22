const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;
const hostname = "http://127.0.0.1";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Render the URL shortener page
app.get('/', (req, res) => {
  renderShortenerPage(res, '', '', 'GET', '');
});

// Handle URL shortening
app.post('/', (req, res) => {
  const { url, alias } = req.body;
  const method = "POST";
  const requestOptions = getRequestOptions(method, { original_url: url, custom_alias: alias });

  import('node-fetch')
  .then(({ default: fetch }) => {
    fetch(`${hostname}:5000/api/v1/shorten`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const errorMessage = result.status === "success" ? "Shortened URL created successfully: " : "Failed to create shortened URL";
        const yasu = result.status === "success" ? `${hostname}:${port}/${result.data.alias}` : '';
        renderShortenerPage(res, url, alias, method, errorMessage, yasu);
      })
      .catch(error => {
        console.error('Error:', error);
        renderShortenerPage(res, url, alias, method, 'Failed to create shortened URL', '');
      });
  })
  .catch(error => {
    console.error('Error:', error);
    renderShortenerPage(res, url, alias, method, 'Failed to create shortened URL', '');
  });

});

// Handle expanding shortened URLs and redirecting
app.get('/:short_code', (req, res) => {
  const alias = req.params.short_code;
  const method = "GET";
  const requestOptions = getRequestOptions(method);

  import('node-fetch')
    .then(({ default: fetch }) => {
      fetch(`${hostname}:5000/api/v1/expand?custom_alias=${alias}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === "success") {
            console.log(result.data.redirct_url)
            res.redirect(301, result.data.redirct_url);
          } else {
            // console.error('Error1:', result.error);
            // res.status(404).send("URL not found");
            res.render('404_not_found', {});
          }
        })
        .catch(error => {
          // console.error('Error2:', error);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch(error => {
      // console.error('Error3:', error);
      res.status(500).send("Internal Server Error");
    });
});


// Function to render the URL shortener page
function renderShortenerPage(res, url, alias, method, errorMessage, yasu = '') {
  res.render('url_shortner', { url, alias, method, errorMessage, yasu });
}

// Function to generate request options for fetch
function getRequestOptions(method, bodyData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(bodyData),
    redirect: "follow"
  };
}

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
