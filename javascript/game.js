var game =  new Phaser.Game('98', '98', Phaser.CANVAS);

game.global = {
    score : 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);

game.state.add('mobile', mobileSate);
game.state.add('level_1', level_1State);
game.state.add('mobile', mobileState);

game.state.start('boot');
