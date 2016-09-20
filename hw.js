///use 92 area. we need to view tables and make new reservation




// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3100;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// Star Wars Characters (DATA)
// =============================================================
var characters = [

	{
		routeName: "yoda",
		name: "Yoda",
		role: "Jedi Master",
		age: 900,
		forcePoints: 2000
	},

	{
		routeName: "darthmaul",
		name: "Darth Maul",
		role: "Sith Lord",
		age: 200,
		forcePoints: 1200
	},

	{
		routeName: "obiwankenobi",
		name: "Obi Wan Kenobi",
		role: "Jedi Master",
		age: 55,
		forcePoints: 1350
	}
]

// Routes
// =============================================================
app.get('/add', function(req, res){

	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/viewchar.html'));
})
// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){

	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/view.html'));
})

app.get('/all', function(req, res){

	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/all.html'));
})
// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:characters?', function(req, res){



	var chosen = req.params.characters;
	// console.log(req.params);
	// console.log(chosen);

	if(chosen){
		console.log(chosen);

		for (var i=0; i <characters.length; i++){

			if (chosen == characters[i].routeName){
				res.json(characters[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(characters);
	}
})

// Create New Characters - takes in JSON input
app.post('/api/new', function(req, res){

	var newCharacter = req.body;
	newcharacter.routeName=newcharacter.name.replace(/\s+/g,'').toLowerCase()
	
	console.log(newCharacter);
	characters.push(newCharacter)
	console.log(characters);
	res.json(newCharacter);

		
	};

	




	// var user_id = req.param('id');
    // var token = req.param('token');
    // var geo = req.param('geo');

	// req.body hosts is equal to the JSON post sent from the user
	// var newcharacter = req.body;

	// console.log(newcharacter);

	// We then display the JSON to the users
	// res.json(newcharacter);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})