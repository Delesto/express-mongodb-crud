const User = require('../models/user');
const PostError = require('../errors/postError');

module.exports = (req, res, next) => {
    if(!req.session.userId) {
        next();
    }
    User.findById(req.session.userId)
        .exec((err, user) => {
            if(err) {
                next(new PostError());
            }

            if(user) {
                req.user = user;
                next();
            }
        });
}