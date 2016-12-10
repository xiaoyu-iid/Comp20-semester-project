var bootState = {
	preload: function(){
		
	},

	create: function(){
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);


			game.state.start('load');
	}
}