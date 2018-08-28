const router = require('express').Router();
const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');

router.get('/create', (req, res, next) => {
    const user = new User({
        name: 'Jhon',
        email: 'testd@123test.com',
        password: 'helloDude'
    });

    user.save((err) => { 
        if (err) {
            console.log(err);
            return next(createError(409))
        } 
        User.find({}).exec((err, users) => {
            if (err) return next(createError(500));
            res.send(users)
        })
    });
});

// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     if (!ObjectId.isValid(id)) {
//         return next(createError(404));
//     }

//     User.find({ _id: id })
//         .exec((err, users) => {
//             if (err) return next(createError(500));
//             res.send(users)
//         });
// });

module.exports = router;