class Player extends Phaser.Physics.Arcade.Sprite {
    // creates a player object with the 'player' key image from the preload class
    // scene is the scene the player will appear in at x and y cooridinates
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // creates sprite of player
        scene.add.existing(this);
        // add the physics rules to this arcade sprite
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 500;
        this.playerSpeed = 200;
        // create basic inputs for handling player movement
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // sets vertical gravity
        this.body.setGravityY(this.gravity);
        // ensures the player cannot move past the edges of the map
        this.setCollideWorldBounds(true);    
    }

    // sets the event listeners
    // necessary for updating animations
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    // called 60 fps
    // when extending from an arcade sprite super class, you must provide time, delta paramaters
    // necessary for updating sprite animation properly in preUpdate
    update(time, delta) {
        // handling player movement
        const { left, right } = this.cursors;

        // moves player left, right, or stops/idle
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed)
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
        } else {
            this.setVelocityX(0);
        }
    }
}

// export Player class to be used in index.js
export default Player;