const router = require('express').Router();
const MongoError = require('mongodb').MongoError;
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
        password: req.body.pass //There will be hashed password!
    });
    //Сохранение нового пользователя в db при регистрации
    user.save((err) => {
        if(err) {
            if (err instanceof MongoError) {
                next(new PostError(400, 'Такой email уже существует'));
            } else {
                if (err.errors.email.$isValidatorError) {
                    next(new PostError(422, 'Некорректный email'));
                }
            }
        }
        //Запись в документ коллекции session id нового пользователя
        req.session.userId = user._id;
        res.send('ok');
    });
});

module.exports = router;

//1. При регистрации пользователя, в базе данных создается документ в коллекции
// session, а так же ставитья кука в браузер.
//2. Далле этот документ доступен как req.session. У каждого пользователя он свой
//3. В req.session записываем id зарегестрированного пользователя
//4. При новых запросах проверяем, есть ли у пользователя sid кука
//5. Если да, то проверяем, содержится ли документ с таким же id в базе
//6. Если да, то извлекаем юзера из базы по userID данной сессии 