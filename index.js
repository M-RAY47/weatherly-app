const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apikey = "";
// Add RestAPI
app.use((req, res, next)=>{
	let {method, path, ip} = req;
	let str =req.method + " " + req.path + " - " + req.ip;
	console.log(str);
	next();
})
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("index", {weather: null, error : null});
})

app.listen(3010, function (){
	console.log("Weatherly app is listening on port 3010!");
})