var game =  new Phaser.Game('98', '98', Phaser.CANVAS);

game.global = {
    score : 0
};

game.add.text( 100, 100, "Hello game is working", {front : '10px Arial', fill: '#ffffff'});
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('level_1', level_1State);
game.state.add('mobile', mobileSate);

game.state.start('boot');
