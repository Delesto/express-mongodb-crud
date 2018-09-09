//Маршрутизация - обработка матодов запроса к серверу и компонентов url, uri
const router = require('express').Router();

router.get('/', (req, res, next) => {
    const user = req.user;
    if(user) {
        if(user.isAdmin) {
            res.render('admin', {
                user: user,
                isAdmin: true
            });
        } else {
            res.render('admin', {
                user: user,
                isAdmin: false
            });   
        }
    } else {    
        res.render('admin', {
            isAdmin: false
        });
    }
});

module.exports = router;