var loadState = {

	preload: function(){
		game.load.image('heart', 'assets/heart.png');
		game.load.image('sky', 'assets/background.png');
		game.load.image('triangle', 'assets/triangle.png');
		game.load.iamge('badtriangle', 'assets/triangle-yellow-b.png');
		game.load.image('polygon', 'assets/polygon-blue.png');
		game.load.image('reload', 'assets/reload.png');
		
		game.load.image('scoreboard', 'assets/losecoreboard.png');
		game.load.image('scoreboardwin', 'assets/winscoreboard.png');
		game.load.image('command', 'assets/command.png');

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