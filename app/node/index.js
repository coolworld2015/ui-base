var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit: '50mb'}));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on 3000');
});

app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/build/index.html');

	res.sendFile(__dirname + '/users.html');			//	MUST REMOVE !!!
	
    //res.send('It is just API Server...');
});

//app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, accept, authorization');
    next();
});

//------------------------------------------------------------------------

var jwt = require('jsonwebtoken');
var secret = 'f3oLigPb3vGCg9lgL0Bs97wySTCCuvYdOZg9zqTY32o';

var token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });

setInterval(function(){
	token = jwt.sign({auth:  'magic'}, secret, { expiresIn: 60 * 60 });
	}, 1000 * 60 * 60);

app.get('/api/auth', function(req, res) {
	return res.send(token);
});

//------------------------------------------------------------------------
app.post('/api/login', function(req, res) {
	var UsersModel = require('./mongo').UsersModel;
    UsersModel.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) {
            res.send({error: err.message});
        } 
		if (user) {
			if (user.pass == req.body.pass) {
				//console.log(user);
				res.send(token);
			} else {
				res.status(403).send({ 
					success: false, 
					message: 'No such pass.' 
				});
			}
		} else {
			res.status(403).send({ 
				success: false, 
				message: 'No such user.' 
			});
		}

    });
});

app.get('/api/users/get', function(req, res) {
	var agent = req.headers.authorization;
	//console.log('agent - ' + agent);
	
	jwt.verify(agent, secret, function(err, decoded) {
		if (err) {
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});
		} else {
			//console.log(decoded);
			var UsersModel = require('./mongo').UsersModel;
			return UsersModel.find(function (err, users) {
				if (!err) {
					return res.send(users);
				} else {
					res.statusCode = 500;
					return res.send({error: 'Server error'});
				}
			});
		}
	});
});