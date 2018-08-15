const router = require('express').Router();

router.get('/', (req, res) => {
    res.cookie('hello', 'hello from express', { maxAge: 10000, httpOnly: true });
    res.render('signin');
});

module.exports = router;