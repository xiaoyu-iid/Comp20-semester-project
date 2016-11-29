var level_1State = {

	create: function(){
		this.bg = game.add.sprite(0,0, 'sky');

		//need to add a background music

		//command picture
		this.cm = game.add.sprite(100, 100 ,'command');
		//what does this mean
		this.cm.anchor.setTo (0.5, 0.5);


		this.lifes = 3;
		this.counterKill = 0;

		this.minSpeed = -1;
		this.maxSpeed = 2;
		this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1) - this.minSpeed;
		this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1) - this.minSpeed;

		this.messageGameOver = '';

		this.shapesGroup = game.add.physicsGroup();

		this.heartsGroup = game.add.group();

		this.win = false;	
		this.scoreBoardGroup = game.add.group();


		for (var i = 0; i < this.lifes; i++){
			this.hearts = this.heartsGroup.create(game.world.width / 2 + 220 +(i * 20), 30, "heart");

		}


		//call the function createShapes to create the shapes
		game.time.events.loop(1000, this.createShapes, this);

		//can change the style of characters later
		this.scorelabel = game.add.text(30,30,'Numbers: 0', {front : '18px Arial', fill: '#ffffff'});

		this.lifelabel = game.add.text(game.world.width / 2 + 150, 25, 'Your Life: ',{front : '18px Arial', fill: '#ffffff'});

		//need to add the expload sound

	},

	update: function(){

		//call the moveShapes function to move each shape
		this.shapesGroup.forEach(this.moveShapes, this);

	},

	createShapes: function(){

		var totalAmount = Math.floor(Math.random() * 10);

		var shape;

		for (var i = 0 ; i < totalAmount; i++){
			if (i % 2 == 0){
				shape = this.shapesGroup.create(game.world.randomX, 480, 'triangle');
				shape = this.shapesGroup.create(game.world.randomX, 480, 'badtriangle');
				shape = this.shapesGroup.create(game.world.randomX, 480, 'polygon');
			}
		}

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

		if(!sprite.alive){
			return;
		}

		sprite.kill();

		if(sprite.key == 'shape'){
			this.counterKill++;
		}else {
			this.lifes--;
			this.heartsGroup.children[this.lifes].kill();
		}


		//add the win when time goes out here

		if (this.lifes == 0){
			this.killPlayer();
			this.win = false;
			this.messageGameOver = "You loose!"

			this.scorelabel.text = "Numbers of Shapes found out: " + this.counterKill;
		}


	},

	killPlayer: function(){

		

	},

	freePlayer: function(){

	},


	showScoreBoardDead: function(){

	},

	showScoreWin: function(){

	},

	gameOver: function(){

	},

	restartGame: function(){
		
	}

	
}