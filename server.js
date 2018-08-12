const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('./public'))
app.set('views', './views');
app.set('view engine', 'pug');

//Routes
const index = require('./routes/index');
const signin = require('./routes/signin');
const signup = require('./routes/signup');
app.use('/', index);
app.use('/signin', signin);
app.use('/signup', signup);

app.listen(config.app.port, config.app.url, () => {
    console.log(`App running on port ${config.app.port}`);
});