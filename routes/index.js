const router = require('express').Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.render('index', {
            user: req.user
        });
    } else {
        res.render('index');
    }
});

module.exports = router;