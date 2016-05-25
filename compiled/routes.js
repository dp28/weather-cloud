var express_1 = require('express');
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send({ message: 'Hello World!!' });
});
exports.default = router;
