var express = require('express');
var $ = require('jquery');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/graph1',function(req, res, next) {
	console.log(jquery);
	var graph1;
	$.getJSON("/graph-samples/10uNkt6sirCnUWw175pjl.json", function(data){
		graph1 = data;
	});
	res.send(graph1);
});

module.exports = router;
