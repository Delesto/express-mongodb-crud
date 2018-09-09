const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

//Users collection schema
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: 'Телефон не указан'
    },
    city: {
        type: String,
        required: false,
        default: 'Город не указан'
    },
    avatar: {
        type: Boolean 
    },
    age: {
        type: String,
        default: 'Возраст не указан'
    },
    resume: {
        type: String,
        required: false,
        default: 'Информация отсутствует'
    },
    position: {
        type: String,
        default: 'Должность не указана'
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
        collection: 'users'
    });

//Password hashing
User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

//Compare user and strored pass 
User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, res) {
        if (err) cb(err);
        cb(null, res); //if success, add user._id to session
    });
};

User.path('email').validate((email) => {
    return validator.isEmail(email);
}, 'email');

User.path('resume').validate((resume) => {
    return resume.length > 200 ? false : true;
}, 'resume');

module.exports = mongoose.model('User', User);