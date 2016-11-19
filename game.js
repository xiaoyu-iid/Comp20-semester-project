var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('logo', 'phaser.png');
    game.load.spritesheet('tri', 'shape.png', 84, 85);
    }

var image;
var score = 0;

function create() {

    //create a group that all triangles belong to
    Triangles = game.add.physicsGroup(Phaser.Physics.ARCADE);

    //set the velocity of the image
    image = game.add.sprite(0, 0, 'tri');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(image, Phaser.Physics.ARCADE);
    
    //the command has some problem to fix
   // image.body.velocity.set(game.rnd.intergerInRange(-100, 100), game.rnd.intergerInRange(-100, 100));


    //emables input actions on the image
    image.inputEnabled = true;

    //click and call the function to kill image
    image.events.onInputDown.add(eraser, this);

    }

//this function will kill the image
function eraser(){
    image.kill();

}
       
function update() {

}

