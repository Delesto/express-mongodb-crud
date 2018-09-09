const ObjectId = require('mongoose').Types.ObjectId;
const PostError = require('../errors/postError');
const createError = require('http-errors');
const router = require('express').Router();
const validator = require('validator');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

router.post('/settings', (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, `${req.user._id}${path.extname(file.originalname)}`);
        }
    });

    const upload = multer({
        storage: storage,
        limits: { fileSize: 200000 }
    }).single('user-avatar');

    upload(req, res, (err) => {
        if (err) {
            next(new PostError());
        }

        User.findById(req.user._id, (err, user) => {
            if (err) {
                next(new PostError());
            } else {
                user.name = validator.isLength(validator.escape(validator.trim(req.body.username)), { min: 3, max: 20 }) ? req.body.username : req.user.name
                user.email = validator.isEmail(req.body.useremail) ? req.body.useremail : req.user.email
                user.password = validator.isLength(req.body.userpass, { min: 6, max: 500 }) ? req.body.userpass : req.user.password
                user.phone = validator.isMobilePhone(req.body.userphone, ['ru-RU']) ? req.body.userphone : req.user.phone
                user.resume = validator.isLength(validator.escape(validator.trim(req.body.userAboutText)), { min: 0, max: 1000 }) ? req.body.userAboutText : req.user.resume
                user.position = validator.isLength(validator.escape(validator.trim(req.body.userPosition)), { min: 0, max: 100 }) ? req.body.userPosition : req.user.position
                user.city = validator.isLength(validator.escape(validator.trim(req.body.userCity)), { min: 0, max: 100 }) ? req.body.userCity : req.user.city
                user.age = validator.isLength(validator.escape(validator.trim(req.body.userAge)), { min: 0, max: 100 }) ? req.body.userAge : req.user.age
                
                if(req.file) {
                    user.avatar = true;
                }
                
                user.save((err) => {
                    if (err) {
                        next(new PostError());
                    }

                    res.send('ok')
                });
            }
        })
    });
});

router.get('/', (req, res, next) => {
    res.send('ok');
});

router.get('/:id', (req, res, next) => {
    const user = req.user;
    if (user) {
        if (ObjectId.isValid(req.params.id)) {
            User.findById(req.params.id)
                .exec((err, foundUser) => {
                    if (err) {
                        next(createError());
                    }

                    if (user) {
                        res.render('user', {
                            user,
                            foundUser
                        })
                    } else {
                        res.redirect('/signup');
                    }
                });
        } else {
            next();
        }
    } else {
        res.redirect('/signup')
    }
}, (req, res, next) => {
    if (req.url === '/settings') {
        if (req.user) {
            res.render('user-settings', {
                user: req.user
            });
        } else {
            res.redirect('/signin');
        }
    } else {
        next(createError(404));
    }
});

module.exports = router;