var express = require('express');

var dogui = require('./controllers/dogui');
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//set up template engine

app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//fire controllers
 app.use('/users', dogui)

app.get('/', function(req, res){
    res.render('index'); 
});



//listen to port
app.listen(3000);
console.log('You are listening to port 4000');