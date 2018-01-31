var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor', { title: 'Knowledge Graphics' });
});

router.post('/upload', function(req, res, next) {
    res.send("ok");
});

module.exports = router;
