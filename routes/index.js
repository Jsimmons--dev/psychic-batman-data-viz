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

/*
API:
GET /graphs (fetch all graphs, low detail)
GET /graphs/:graphID (fetch all data for one graph)
POST /graphs/ (store new graph and return cooled force layout?)
*/

router.get('/graphs', function (req, res, next){
  console.log("get graphs");
  GraphDB.find({}, ['name', 'md5'], function(err, graphs){
    if (err) { return next(err); }
    res.json(graphs);
  });
});

router.post('/graphs', function(req, res, next){
  console.log("post graphs");
  console.log(req.data);
  console.log("yeah");
  //req.files.newGraph returns json representation
  //check for type text/json

  // var graph = new Graph(req.body);
  // graph.save(function(err, graph){
  //   if(err) { return next(err); }
  //   res.json(graph);
  // });
});

router.param('graphID', function(req, res, next, id){
  var query = GraphDB.findById(id);

  query.exec(function(err, graph){
    if (err) { return next(err); }
    if (!graph) { return next(new Error('can\'t find post')); }
    req.graph = graph;
    return next();
  });
});

router.get('graphs/:graphID', function(req, res, next){
  res.json(req.graph);
});


module.exports = router;
