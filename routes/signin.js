const router = require('express').Router();
const User = require('../models/user');
const PostError = require('../errors/postError.js');

router.get('/', (req, res) => {
    if(req.user) {
        res.redirect('/');
    } else {
        res.render('signin');
    }
});

router.post('/', (req, res, next) => {
    //Поиск пользователя по email в базе при авторизации
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) { return next(new PostError()); } //500 error
            //Если найден...
            if (user) {
                //Проверяем введенный пароль
                user.comparePassword(req.body.pass, (err, isMatch) => {
                    if (err) { return next(new PostError()); } //500 error
                    if (!isMatch) {
                        next(new PostError(400, 'Неверный пароль'));
                    } else {
                        //Если все данные верны, ставим сессионную куку и записываем id пользователя в MongoDB
                        req.session.userId = user._id;
                        res.send('ok');
                    }
                });
            } else {
                //Обработка неверного email
                next(new PostError(400, 'Такого пользователя нет'))
            }
        });
})

module.exports = router;