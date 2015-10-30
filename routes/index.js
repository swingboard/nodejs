var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'I am test Express' });
});

/* GET test page. */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs){
	res.render('userlist', {"userlist" : docs
	});
  });
});
/* Add new user */
router.get('/adduser', function(req, res, next){
	res.render('newuser', {title: 'Add New user'});
});

/* process post data */
router.post('/adduser', function(req, res) {
	var db = req.db;
	var username = req.body.username;
	var usermail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({"username": username, "email": usermail}, function(err, doc) {
		if (err)
			res.send("There is a problem while insert one item into Mongodb");
		else
			res.redirect('userlist');
	});
});
module.exports = router;
