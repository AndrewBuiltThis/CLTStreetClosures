var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('explore', { title: 'Search for Street Closures' });
});

module.exports = router;

