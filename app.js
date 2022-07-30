var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/game');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var gender = req.body.gender;
	var score = req.body.score;

	var data = {
		"name": name,
		"gender": gender,
		"score": score
	}


db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('signup_success.html');
})




app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});

return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
