var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/graph-sample/1/1.json',function(req,res,next){
// 	//console.log('requested');
// 		res.sendFile('/graph-sample/1/1.json',function(err){
// 			console.log('sent');
// 		});
// });
// router.get('/data/graph/',function(req, res, next) {
// 	//console.log(JSON.parse());
// 	var json;
// 	json = JSON.parse('{}');
// 	console.log(json);
// 	res.send(json);
// 	console.log('made it here');
// 	//res.send(JSON.parse('/graph-sample/1/1.json'));
// });

module.exports = router;
