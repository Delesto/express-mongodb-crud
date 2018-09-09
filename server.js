const path = require('path');
const multer = require('multer');
const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); //Session store module
const cookieParser = require('cookie-parser');
const rusErrorMessages = require('./errors/index');
const addUserToReq = require('./middlewares/user');

mongoose.connect(config.mongoose.url, { useNewUrlParser: true });

mongoose.connection.on("open", () => {
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to mongo server!");
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views'); //Directory for templates
app.set('view engine', 'pug'); //Set template engine

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(addUserToReq);

//Routes
const index = require('./routes/index');
const signin = require('./routes/signin');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const user = require('./routes/user');
const admin = require('./routes/admin');

app.use('/', index);
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/user', user);

//Handle 404 error
app.use((req, res, next) => {
    next(createError(404));
});
//Error handling
app.use((err, req, res, next) => {
    if(req.method === 'GET') {
        res.render('error', {
            status: createError(err.status || 500).status,
            message: rusErrorMessages[err.status || 500]
                || createError(err.status).message
        });
    } else {
        res.status(err.status).json(err);
    }
});

app.listen(config.app.port, config.app.url, () => {
    console.log(`App running on port ${config.app.port}`);
});