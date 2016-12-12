var mobileState = {

	create: function(){
		//this.bg = game.add.sprite(0,0, 'sky');

		//game.stage.backgroundColor = "#0000FF";
		//this.hello = game.add.sprite(100, 100, 'heart');

		//console.log("MMMMMMMMMMMOOOOOBILE");

		this.bgSound = game.add.audio('music');

		//command picture
		this.cm = game.add.sprite(window.innerWidth * 0.03, window.innerHeight * 0.75, 'command');
		this.cm.scale.setTo(window.innerWidth / 680, window.innerWidth / 680);
		//this.cm.anchor.setTo ('10', '90');

		//play music
		this.bgSound.play();
		this.bgSound.loop = true;

		this.lifes = 3;
		this.counterKill = 0;

		//the spped of the shapes when generating
		this.minSpeed = -1;
		this.maxSpeed = 1.5;
		this.vx = Math.random()*(this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
		this.vy = Math.random()*(this.maxSpeed - this.minSpeed + 1) - this.minSpeed;

		this.messageGameOver = '';

		this.shapesGroup = game.add.physicsGroup();

		this.heartsGroup = game.add.group();

		this.win = true;	
		this.messageGameOver = "Time's up!";
		this.scoreBoardGroup = game.add.group();

		//can change the style of characters later
		this.scorelabel = game.add.text(window.innerWidth * 0.03, window.innerHeight * 0.05,'Numbers: 0', {front : "10px Arial",
															 fill: "#ffffff"
															});
		this.scorelabel.scale.setTo(window.innerWidth / 480, window.innerWidth / 480);

		this.lifelabel = game.add.text(window.innerWidth * 0.03, window.innerHeight * 0.11, 'Your Lives: ',{front : '10px Arial',
																					  fill: '#ffffff'});
		this.lifelabel.scale.setTo(window.innerWidth / 480, window.innerWidth / 480);

		//creating the three hearts in thce group and render on the screen
		for (var i = 0; i < this.lifes; i++){
			this.hearts = this.heartsGroup.create(window.innerWidth * 0.35 + (i * window.innerWidth / 640 * 65), window.innerHeight * 0.11, "heart");
			this.hearts.scale.setTo(window.innerWidth / 640 * 0.3, window.innerWidth / 640 * 0.3);
		}

		//timer
		game.time.events.add(300, this.gameOver, this);
		timeRemaining = 30;
		timeRemainingText = game.add.text(window.innerWidth * 0.03, window.innerHeight * 0.17, "Time remaining:" + "30s", {
			font: "20px Arial",
        	fill: "#ffffff",
        	align: "left"	
		});

		timeRemainingText.scale.setTo(window.innerWidth / 480, window.innerWidth / 480);
		
		//call the function createShapes to create the shapes
		game.time.events.loop(1000, this.createShapes, this);

		

		//need to add the expload sound
		this.explodeSound = game.add.audio('explode');

		this.winSound = game.add.audio('win');
		this.loseSound = game.add.audio('lose');

	},

	update: function(){

		//call the moveShapes function to move each shape
		this.shapesGroup.forEach(this.moveShapes, this);
		//update the timer 
		timeRemainingText.setText("Time remaining: " + timeRemaining + "s");

	},

	createShapes: function(){

		var totalAmount = Math.floor(Math.random() * 3);

		var shape;

		//how to deal with overlapping
		for (var i = 0 ; i < totalAmount; i++){
			if (i % 2 == 0){
				shape = this.shapesGroup.create(game.world.randomX, window.innerHeight * 0.65 , 'triangle');
				shape.scale.setTo(window.innerWidth / 320 * 0.56, window.innerWidth / 320 * 0.56);
				shape = this.shapesGroup.create(game.world.randomX, window.innerHeight * 0.65, 'badtriangle');
				shape.scale.setTo(window.innerWidth / 320, window.innerWidth / 320);
				shape = this.shapesGroup.create(game.world.randomX, window.innerHeight * 0.65, 'polygon');
				shape.scale.setTo(window.innerWidth / 320 * 0.86, window.innerWidth / 320 * 0.86);
				game.world.bringToTop(this.cm);
			}
		}
		timeRemaining --;

	},

	moveShapes: function(shape){

		//var that = this;

		shape.inputEnabled = true;
		shape.checkWorldBounds = true;
		shape.outOfBoundsKill = true;

		//set the speed of balloon
		var minSpeed = -(Math.floor(Math.random()));
        var maxSpeed = Math.floor(Math.random() * 2);
        var vx = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;
        var vy = Math.random() * (maxSpeed - minSpeed + 1) - minSpeed;

        shape.body.velocity.y -= vy;

        //call kill shapes when it is clicked 
        shape.events.onInputDown.add(this.killShapes, this);

	},

	killShapes: function(sprite, pointer){

		//a test to show the sprite key
		//console.log(sprite.key);

		//add the explode sound to play here
		this.explodeSound.play();

		if(!sprite.alive){
			return;
		}

		sprite.kill();
		if(sprite.key == 'triangle'){
			this.counterKill++;
		} else {
			if (this.lifes > 0) {
				this.lifes--;
				//console.log(this.lifes);
				this.heartsGroup.children[this.lifes].kill();
		    }
		}


		//add the win when time goes out here
		//call game over here directly
		if (this.lifes <= 0){
			//shape.inputEnabled = false;
			//console.log("lose status");
			this.win = false;
			this.messageGameOver = "You lose!"
			this.gameOver();
	
		}

	this.scorelabel.text = "Numbers: " + this.counterKill;

	},

	showScoreBoardLose: function(){
		this.gameOverLabel = game.add.text(window.innerWidth * 0.37, window.innerHeight * 0.32, this.messageGameOver, {
																							font : '50px Arial',
																							fill: '#ffffff'
																						});
		this.gameOverLabel.scale.setTo(window.innerWidth / 680, window.innerWidth / 680);
		//this.gameOverLabel.anchor.setTo(window.innerWidth / 1280, window.innerWidth / 1280);

		this.lifeFinalScore = game.add.text(window.innerWidth * 0.36, window.innerHeight * 0.29,'Life Remaining: ', {
																								  font : '30px Arial',
																								  fill: '#000000'
																								});
		this.lifeFinalScore.scale.setTo(window.innerWidth / 1080, window.innerWidth / 1080);

		this.finalScore = game.add.text(window.innerWidth * 0.4, window.innerHeight * 0.395, 'Triangles: ', {font : '30px Arial',
																				   		 	fill: '#000000'})

		this.finalScore.scale.setTo(window.innerWidth / 1080, window.innerWidth / 1080);

		this.scoreBoardGroup.create((game.world.width / 2 - 225), window.innerHeight * 0.2, "scoreboard");

		this.buttonReload = game.add.sprite(game.world.width / 2 - 15, game.world.height * 0.6, "reload");
		this.buttonReload.scale.setTo(window.innerWidth / 10800, window.innerWidth / 10800)
		this.buttonReload.inputEnabled = true;
		

		this.buttonReload.events.onInputDown.add(this.restartGame, this);


		game.world.bringToTop(this.finalScore);
		game.world.bringToTop(this.lifeFinalScore);

		this.lifeFinalScore.text = "Life Remaining: " + this.lifes;
		this.finalScore.text = "Triangles: " + this.counterKill;

		game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.lifeFinalScore).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.finalScore).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.gameOverLabel).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.buttonReload).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

	},

	showScoreWin: function(){
		timeRemainingText.setText("Time remaining: " + "0s");

		this.gameOverLabel = game.add.text(window.innerWidth * 0.31, window.innerHeight * 0.22, this.messageGameOver, {
																							font : '50px Arial',
																							fill: '#ff0000'
																						});
		this.gameOverLabel.scale.setTo(window.innerWidth / 680, window.innerWidth / 680);
		//this.gameOverLabel.anchor.setTo(window.innerWidth / 1280, window.innerWidth / 1280);

		this.lifeFinalScore = game.add.text(window.innerWidth * 0.29, window.innerHeight * 0.35,'Life Remaining: ', {
																								  font : '30px Arial',
																								  fill: '#000000'
																								});
		this.lifeFinalScore.scale.setTo(window.innerWidth / 600, window.innerWidth / 600);

		this.finalScore = game.add.text(window.innerWidth * 0.35, window.innerHeight * 0.425, 'Triangles: ', {font : '30px Arial',
																				   		 	fill: '#000000'})

		this.finalScore.scale.setTo(window.innerWidth / 720, window.innerWidth / 720);

		this.scoreBoardGroup.create(window.innerWidth * 0.5 - 85, window.innerHeight * 0.45, "m_winscoreboard");

		//console.log("gameworld" + game.world.width);
		//console.log("gameworld" + game.world.width/2);
		//console.log("gameworld" + (game.world.width/2 - 225 ));
		
		//console.log(game.world.width / 1144);
		//console.log("window" + (game.world.width / 2 - (225 * (game.world.width / 1144))));
		//console.log ("should be" + (game.world.width / 2 - 225));

		this.scoreBoardGroup.scale.setTo(0.7, 0.6);
		//this.scoreBoardGroup.position.x = (game.world.width / 2 - (450 * (game.world.width / 1144)));
		//console.log (this.scoreBoardGroup.position.x);


		this.buttonReload = game.add.sprite(game.world.width / 2 - 131 * window.innerWidth / 720, game.world.height * 0.525, "reload");
		this.buttonReload.scale.setTo(window.innerWidth / 720, window.innerWidth / 720);
		this.buttonReload.inputEnabled = true;
		

		this.buttonReload.events.onInputDown.add(this.restartGame, this);

/*
		this.buttonLeader = game.add. sprite(game.world.width / 2 - 131 * window.innerWidth / 720, game.world.height * 0.6, "leaderboard");
		this.buttonLeader.scale.setTo(window.innerWidth / 720, window.innerWidth / 720);
		this.buttonReload.inputEnabled = true;
		this.buttonReload.events.onInputDown.add(this.leaderboard, this);
		*/
		this.buttonLeader = game.add.sprite(game.world.width/2 - 131 * window.innerWidth / 720, game.world.height * 0.625, "leaderboard");
		this.buttonLeader.scale.setTo(window.innerWidth / 740, window.innerWidth / 720);
		this.buttonLeader.inputEnabled = true;

		this.buttonLeader.events.onInputDown.add(this.leaderBoard, this);

		//this.scoreBoardGroup.add(this.buttonReload);

		//this.scoreBoardGroup.add(this.lifeFinalScore);
		//this.scoreBoardGroup.add(this.finalScore);
		//this.scoreBoardGroup.add(this.gameOverLabel);

		game.world.bringToTop(this.finalScore);
		game.world.bringToTop(this.lifeFinalScore);

		this.lifeFinalScore.text = "Life Remaining: " + this.lifes;
		this.finalScore.text = "Triangles: " + this.counterKill;

		game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.lifeFinalScore).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.finalScore).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.gameOverLabel).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.buttonReload).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
		game.add.tween(this.buttonLeader).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

	},

	gameOver: function(shape){

		if (this.win){
			this.bgSound.stop();
			this.explodeSound.stop();
			this.winSound.play();
			this.winSound.loop = false;
			game.time.events.stop();
			this.showScoreWin();

		} else {
			this.bgSound.stop();
			this.explodeSound.stop();
			this.loseSound.play();
			this.loseSound.loop = false;
			game.time.events.stop();
			this.showScoreBoardLose();
		}

		// the key value should later be updated as individual usernames
		// JQuery should be used here
		// the key-value pair should be sent to server after each game
		if (navigator.geolocation) {
       		navigator.geolocation.getCurrentPosition(function(position){
       			this.lat = position.coords.latitude;
       			this.lon = position.coords.longitude;

			user = localStorage.getItem("current_user");
			var info_package = {
				"username": user,
				"score": this.counterKill,
				"latitude": this.lat,
				"longitude": this.lon
			}
			//localStorage.setItem("Score", this.counterKill);
			//console.log(this.counterKill);
			$.ajax ({
       			type: "POST",
       			url: "https://immense-plateau-64166.herokuapp.com/submit.json", 
       			data: info_package,
       		 	success: null
      		}); 

       	});

    	} else {
        	alert("Geolocation is not supported by this browser.");
    	}

    	

	},


	leaderBoard: function(){

		window.location.href = "http://tuftsdev.github.io/comp20-f2016-team8/leaderboard";

	},

	restartGame: function(){

		game.time.events.start();
		game.state.start('level_1');
		
	}

	
}