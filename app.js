const express = require('express');
const pug = require('pug');

const app = express();

app.set('view engine', 'pug');

// include routes
const routes = require('./routes/index');
app.use(routes);

// serve static files from /public directory
app.use(express.static('public'));

// Create the server on port 3000
app.listen(3000, () => {
  console.log('The application is running on http://localhost:3000');
});