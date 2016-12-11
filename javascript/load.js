var loadState = {

	preload: function(){
		game.load.image('heart', 'pictures/heart.png');
		game.load.image('sky', 'pictures/background.png');
		game.load.image('triangle', 'pictures/triangle.png');
		game.load.image('badtriangle', 'pictures/triangle-yellow-b.png');
		game.load.image('polygon', 'pictures/polygon-blue.png');
		game.load.image('reload', 'pictures/reload.png');

		game.load.image('scoreboard', 'pictures/losescoreboard.png');
		game.load.image('scoreboardwin', 'pictures/winscoreboard.png');
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

			game.add.text(150, 300, "Hello load is working", {front: '10 px Arial'}, fill: '#0000FF');

			//game.scale.setScreenSize(true)
			game.state.start('mobile');


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

    		
			game.state.start('level_1');
		}

	}
	
}
