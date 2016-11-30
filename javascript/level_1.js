var level_1State = {

	create: function(){
		//this.bg = game.add.sprite(0,0, 'sky');

		this.bgSound = game.add.audio('music');

		//command picture
		this.cm = game.add.sprite(10, 500 , 'command');
		//what does this mean
		//this.cm.anchor.setTo ('10', '90');

		//play music
		this.bgSound.play();
		this.bgSound.loop = true;

		this.lifes = 3;
		this.counterKill = 0;

		//the spped of the shapes when generating
		this.minSpeed = -1;
		this.maxSpeed = 2;
		this.vx = Math.random()*(this.maxSpeed - this.minSpeed + 1) - this.minSpeed;
		this.vy = Math.random()*(this.maxSpeed - this.minSpeed + 1) - this.minSpeed;

		this.messageGameOver = '';

		this.shapesGroup = game.add.physicsGroup();

		this.heartsGroup = game.add.group();

		this.win = true;	
		this.messageGameOver = "You win!";
		this.scoreBoardGroup = game.add.group();

		//can change the style of characters later
		this.scorelabel = game.add.text(30,25,'Numbers: 0', {front : "10px Arial",
															 fill: "#ffffff"
															});

		this.lifelabel = game.add.text(game.world.width / 2 + 275, 25, 'Your Lifes: ',{front : '10px Arial',
																					  fill: '#ffffff'});

		//creating the three hearts in the group and render on the screen
		for (var i = 0; i < this.lifes; i++){
			this.hearts = this.heartsGroup.create(game.world.width / 2 + 420 + (i * 45), 25, "heart");
			this.hearts.scale.setTo(0.2, 0.2);

		}

		//timer
		game.time.events.add(30000, this.gameOver, this);
		timeRemaining = 30;
		timeRemainingText = game.add.text(30, 60, "Time remaining:" + "30s", {
			font: "20px Arial",
        	fill: "#ffffff",
        	align: "left"	
		});
		
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

		var totalAmount = Math.floor(Math.random() * 10);

		var shape;

		//how to deal with overlapping
		for (var i = 0 ; i < totalAmount; i++){
			if (i % 2 == 0){
				shape = this.shapesGroup.create(game.world.randomX, 560 , 'triangle');
				shape.scale.setTo(0.6, 0.6);
				shape = this.shapesGroup.create(game.world.randomX, 560, 'badtriangle');
				shape = this.shapesGroup.create(game.world.randomX, 560, 'polygon');
				shape.scale.setTo(0.95, 0.95);
				game.world.bringToTop(this.cm);
			}
		}
		timeRemaining --;

	},

	moveShapes: function(shape){

		var that = this;

		shape.inputEnabled = true;
		shape.checkWorldBounds = true;
		shape.outOfBoundsKill = true;

		//set the speed of balloon
		var minSpeed = -(Math.floor(Math.random()));
        var maxSpeed = Math.floor(Math.random() * 1.5);
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
			this.lifes--;
			this.heartsGroup.children[this.lifes].kill();
		}


		//add the win when time goes out here
		//call game over here directly
		if (this.lifes == 0){
			this.win = false;
			this.messageGameOver = "You lose!"
			this.gameOver();

			
		}
	this.scorelabel.text = "Numbers: " + this.counterKill;

	},

//these two functions about players are not necessary 
	//killPlayer: function(){

		

//	},

	//freePlayer: function(){

//	},


	showScoreBoardLose: function(){
		this.gameOverLabel = game.add.text(game.world.width / 2,120, this.messageGameOver, {font : '50px Arial',
																							fill: '#ffffff'});
		this.gameOverLabel.anchor.setTo(0.5, 0.5);

		this.lifeFinalScore = game.add.text(game.world.width / 2  - 110, 220,'Life Remaining: ', {font : '30px Arial',
																								  fill: '#000000'});
		this.finalScore = game.add.text(game.world.width / 2 - 110, 280, 'Triangles: ', {font : '30px Arial',
																				   		 fill: '#000000'})

		this.scoreBoardGroup.create(game.world.width / 2 - 225 , 150, "scoreboard");

		this.buttonReload = game.add.sprite(game.world.width / 2 - 15, game.world.height / 2 + 75, "reload");
		this.buttonReload.scale.setTo(0.1, 0.1)
		this.buttonReload.inputEnabled = true;
		

		this.buttonReload.events.onInputDown.add(this.restartGame, this);
		this.scoreBoardGroup.add(this.buttonReload);

		this.scoreBoardGroup.add(this.lifeFinalScore);
		this.scoreBoardGroup.add(this.finalScore);
		this.scoreBoardGroup.add(this.gameOverLabel);

		game.world.bringToTop(this.finalScore);
		game.world.bringToTop(this.lifeFinalScore);

		this.lifeFinalScore.text = "Life Remaining: " + this.lifes;
		this.finalScore.text = "Triangles: " + this.counterKill;

		game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

	},

	showScoreWin: function(){

	},

	gameOver: function(){

		if (this.win){
			this.bgSound.stop();
			this.explodeSound.stop();
			this.winSound.play();
			this.winSound.loop = false;
			game.time.events.stop();
			this.showScorewin();

		} else {
			this.bgSound.stop();
			this.explodeSound.stop();
			this.loseSound.play();
			this.loseSound.loop = false;
			game.time.events.stop();
			this.showScoreBoardLose();
		}

	},

	restartGame: function(){

		game.time.events.start();
		game.state.start('level_1');
		
	}

	
}