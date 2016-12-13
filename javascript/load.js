var loadState = {

	preload: function(){
		game.load.image('heart', 'pictures/heart.png');
		game.load.image('sky', 'pictures/background.png');
		game.load.image('triangle', 'pictures/triangle.png');
		game.load.image('badtriangle', 'pictures/triangle-yellow-b.png');
		game.load.image('polygon', 'pictures/polygon-blue.png');
		game.load.image('reload', 'pictures/reload.png');
		game.load.image('leaderboard', 'pictures/leader_button.png');
		game.load.image('startgame', 'pictures/startgame.png');

		game.load.image('scoreboard', 'pictures/losescoreboard.png');
		game.load.image('scoreboardwin', 'pictures/winscoreboard.png');
		game.load.image('m_losescoreboard', 'pictures/m_losescoreboard.png');
		game.load.image('m_winscoreboard', 'pictures/m_winscoreboard.png');
		
		game.load.image('command', 'pictures/command_line.png');

		game.load.audio('music', 'music/background.mp3');
		game.load.audio('explode', 'music/button-click.mp3');
		game.load.audio('win', 'music/win.mp3');
		game.load.audio('lose', 'music/lose.mp3');

	},

	create: function(){

	if(!game.device.desktop){
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			document.body.style.backgroundColor = '#000000';


			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxHeight = 680;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;

			//game.add.text(150, 300, "Hello load is working", {front: '10 px Arial'}, fill: '#0000FF');

			//game.scale.setScreenSize(true)
			this.gameStart = game.add.sprite(game.world.width * 0.475, game.world.height * 0.475, "startgame");
			this.gameStart.scale.setTo(window.innerWidth / 600 * 0.45, window.innerWidth / 600 * 0.45);
			this.gameStart.inputEnabled = true;

			this.gameStart.events.onInputDown.add(this.startMobile, this);
			

		} else {
			//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			
			//game.scale.minWidth = 1000;
			//game.scale.minHeight = 680;
			//game.scale.maxWidth = 2000;
			//game.scale.maxHeight = 1360;
			
			//var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game')
			game.scale.refresh();
			
   			game.scale.pageAlignHorizontally = true;
    		game.scale.pageAlignVertically = true;

    		this.gameStart = game.add.sprite(game.world.width /2 - 150, game.world.height / 2, "startgame");
			this.gameStart.scale.setTo(window.innerWidth / 1080 * 0.7, window.innerWidth / 1080 * 0.7);
			this.gameStart.inputEnabled = true;

			this.gameStart.events.onInputDown.add(this.startGame, this);
			
		}


	},

	startGame: function(){
		game.state.start('level_1');

	},

	startMobile: function(){
		game.state.start('mobile');
	}
	
}