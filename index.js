const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const apikey = "262e856e4263d088f4387821b2e1ef20";
// Add RestAPI
app.use((req, res, next)=>{
	let {method, path, ip} = req;
	let str =`${req.method} ${req.path} - ${req.ip}`
	console.log(str);
	next();
})
app.use(express.static(__dirname + "/public"));
app.use('*/css',express.static('public/css'));
// app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));

app.use(bodyParser.urlencoded({extended: false}));
// setting the app on ejs
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("index", {weather: null, error : null});
})

app.post("/", (req, res)=>{
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
	console.log(req.body.city);
	request(url, (err, response, body)=>{
		if (err){
			res.render("index", {weather: null, error: err});
		} else {
			let weather = JSON.parse(body);
			if(weather.main == undefined){
				res.render("index", {
					weather: null,
					error: `Error, please try again`
				});
			} else {
				let weatherText = `It's ${weather.main.temp} degree celcuis with ${weather.weather[0].main} in ${weather.name}!`;
				res.render("index", {weather: weatherText, error: null});
				console.log("body:", body);
			}
		}
	})
})

const port = Process.env.PORT || 3000 ;
app.listen(port, ()=>{
	console.log("Weatherly app is listening on port" + port + "!");
})