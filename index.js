const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apikey = "";
// Add RestAPI
app.use((req, res, next)=>{
	let {method, path, ip} = req;
	let str =`${req.method} ${req.path} - ${req.ip}`;
	console.log(str);
	next();
})
app.use(express.static(__dirname + "/public"));
app.use('*/css',express.static('public/css'));
// app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

app.use(bodyParser.urlencoded({extended: true}));
// setting the app on ejs
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("index", {weather: null, error : null});
})

app.listen(3010, function (){
	console.log("Weatherly app is listening on port 3010!");
})