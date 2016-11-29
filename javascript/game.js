var game =  new Phaser.Game('100', '100', Phaser.AUTO);

game.global = {
    score : 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('level_1', level_1State);

game.state.start('boot');