var bootState = {
	preload: function(){
		
	},

	create: function(){
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.text(window.innerWidth * 0.6, window.innerHeight * 0.05, 'Boot is working',{front : '10px Arial',
																					  fill: '#ffffff'});

			game.state.start('load');
	}
}