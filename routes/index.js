const createError = require('http-errors');
const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    const user = req.user;
    if(user) {
        User.find({})
            .exec((err, users) => {
                if(err) {
                    next(createError());
                }

                res.render('index', {
                    user,
                    users
                })
            });
    } else {
        res.redirect('/signin');
    }
});
module.exports = router;