var loadState = {

	preload: function(){
		game.load.image('heart', 'pictures/heart.png');
		game.load.image('sky', 'pictures/background.png');
		game.load.image('triangle', 'pictures/triangle.png');
		game.load.iamge('badtriangle', 'pictures/triangle-yellow-b.png');
		game.load.image('polygon', 'pictures/polygon-blue.png');
		game.load.image('reload', 'pictures/reload.png');

		game.load.image('scoreboard', 'pictures/losecoreboard.png');
		game.load.image('scoreboardwin', 'pictures/winscoreboard.png');
		game.load.image('command', 'pictures/command.png');

		//need to add music

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

		}
	
	game.state.start('level_1');

	}
	
}