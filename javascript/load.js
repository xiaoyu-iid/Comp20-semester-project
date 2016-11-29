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
		game.load.image('command', 'pictures/command.png');

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

			game.scale.setScreenSize(true)

		} else {
			//game.scale.setScreenSize(true)
			//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   			game.scale.pageAlignHorizontally = true;
    		game.scale.pageAlignVertically = true;
		}

	
	game.state.start('level_1');

	}
	
}