const path = require('path');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const rusErrorMessages = require('./errors/index');
console.log(rusErrorMessages)
const app = express();
// app.use(sendHttpError);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'pug');

//Routes
const index = require('./routes/index');
const signin = require('./routes/signin');
const signup = require('./routes/signup');
app.use('/', index);
app.use('/signin', signin);
app.use('/signup', signup);

//Handle 404 error
app.use((req, res, next) => {
    next(createError(404));
});
//Error handling
app.use((err, req, res, next) => {
    res.render('error', {
        status: createError(err.status || 500).status,
        message: rusErrorMessages[createError(err.status).status] 
        || createError(err.status).message 
    });
});

app.listen(config.app.port, config.app.url, () => {
    console.log(`App running on port ${config.app.port}`);
});