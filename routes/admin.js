//Маршрутизация - обработка матодов запроса к серверу и компонентов url, uri
const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(403).send('Вход запрещен');
});

module.exports = router;