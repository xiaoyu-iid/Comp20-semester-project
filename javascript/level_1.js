var level_1State = {

	create: function(){
		//this.bg = game.add.sprite(0,0, 'sky');

		this.bgSound = game.add.audio('music');

		//command picture
		this.cm = game.add.sprite(100, 100 ,'command');
		//what does this mean
		this.cm.anchor.setTo ('10', '90');

		//play music
		this.bgSound.play();
		this.bgSound.loop = true;

		this.lifes = 3;
		this.counterKill = 0;

		//the spped of the shapes when generating
		this.minSpeed = -1;
		this.maxSpeed = 2;
		this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1) - this.minSpeed;
		this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1) - this.minSpeed;

		this.messageGameOver = '';

		this.shapesGroup = game.add.physicsGroup();

		this.heartsGroup = game.add.group();

		this.win = false;	
		this.scoreBoardGroup = game.add.group();

		//creating the three hearts in the group and render on the screen
		for (var i = 0; i < this.lifes; i++){
			this.hearts = this.heartsGroup.create(game.world.width / 2 + 300 +(i * 50), 25, "heart");
			this.hearts.scale.setTo(0.2, 0.2);

		}

		//timer
		game.time.events.add(15000, this.gameOver, this);
		timeRemaining = 15;
		timeRemainingText = game.add.text(30, 60, 'Time remaining:' + "15s", {
			font: "20px Arial",
        	fill: "#ffffff",
        	align: "left"	
		});
		
		//call the function createShapes to create the shapes
		game.time.events.loop(1000, this.createShapes, this);

		//can change the style of characters later
		this.scorelabel = game.add.text(30,25,'Numbers: 0', {front : '10px Arial', fill: '#ffffff'});

		this.lifelabel = game.add.text(game.world.width / 2 + 150, 25, 'Your Life: ',{front : '10px Arial', fill: '#ffffff'});

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
		var minSpeed = -(Math.floor(Math.random() * 2));
        var maxSpeed = Math.floor(Math.random() * 5);
        var vx = Math.random()*(maxSpeed - minSpeed+1)-minSpeed;
        var vy = Math.random()*(maxSpeed - minSpeed+1)-minSpeed;

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
		}else {
			this.lifes--;
			this.heartsGroup.children[this.lifes].kill();
		}


		//add the win when time goes out here

		if (this.lifes == 0){
			this.win = false;
			this.gameOver();
			this.messageGameOver = "You loose!"

			
		}
	this.scorelabel.text = "Numbers: " + this.counterKill;

	},

//these two functions about players are not necessary 
	//killPlayer: function(){

		

//	},

	//freePlayer: function(){

//	},


	showScoreBoardDead: function(){


	},

	showScoreWin: function(){

	},

	gameOver: function(){

		if(this.win){
			this.bgSound.stop();
			this.explodeSound.stop();
			this.winSound.play();
			this.winSound.loop = false;
			game.time.events.stop();
			this.showScorewin();

		}else{
			this.bgSound.stop();
			this.explodeSound.stop();
			this.loseSound.play();
			this.loseSound.loop = false;
			game.time.events.stop();
			this.showScoreBoardDead();
		}

	},

	restartGame: function(){

		game.time.events.start();
		game.state.start('level_1');
		
	}

	
}