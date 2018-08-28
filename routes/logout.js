const router = require('express').Router();
const PostError = require('../errors/postError');

router.post('/', (req, res, next) => {
    if (!req.user) {
        next();
    }

    req.session.destroy(function (err) {
        if(err) {
            next(new PostError());
        }

        res.send('ok');
    });
});

module.exports = router;