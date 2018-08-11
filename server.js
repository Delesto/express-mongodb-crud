const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');

//Routes
const index = require('./routes/index');
app.use('/', index);

app.listen(config.app.port, config.app.url, () => {
    console.log(`App running on port ${config.app.port}`);
});