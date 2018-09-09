const router = require('express').Router();
const User = require('../models/user');
const PostError = require('../errors/postError.js');

router.get('/', (req, res, next) => {
    if(req.user) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
});

router.post('/', (req, res, next) => {
    const user = User({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password, //There will be hashed password!
    });
    //Сохранение нового пользователя в db при регистрации
    user.save(function(err) {
        if(err) {
            if(err.name === 'MongoError') {
                next(new PostError(400, 'Такой email уже существует'));
            } else if(err.name === 'ValidationError') {
                if(err.errors.email) {
                    next(new PostError(422, 'Некорректный email'));
                }
            } else {
                next(new PostError());
            }
        } else {
            //Если ошибок нет
            //Запись в документ коллекции session id нового пользователя
            req.session.userId = user._id;
            res.send('ok');
        }
    });
});

module.exports = router;