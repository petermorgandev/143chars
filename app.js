const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
const routes = require('./routes/index');
app.use(routes);

// serve static files from /public directory
app.use(express.static('public'));

// Create the server on port 3000
app.listen(3000, () => {
  console.log('The application is running on http://localhost:3000');
});