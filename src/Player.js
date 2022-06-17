/* A class to create the player that is a sprite

Documention: An Arcade Physics Sprite is a Sprite
with an Arcade Physics body and related components.*/

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

    // sets up player with functionality
    init() {
        // player properties
        this.gravity = 500;
        this.playerSpeed = 200;


        // create basic inputs for handling player movement
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // sets vertical gravity
        this.body.setGravityY(this.gravity);
        // ensures the player cannot move past the edges of the map
        this.setCollideWorldBounds(true);

        // create playeranimations
        // note: frames start with index 0
        this.scene.anims.create({
            // run animation from frames 9 - 16 from idle,run,jump_sheet.png
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 8}),
            frameRate: 8, // executes animation per second
            repeat: -1 // continuously runs
        })
        this.scene.anims.create({
            // run animation from frames 9 - 16 from idle,run,jump_sheet.png
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 11, end: 16}),
            frameRate: 8, // executes animation per second
            repeat: -1 // continuously runs
        })
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

        /* moves player left, right, or stops
            flips character when pressing left or right
            plays idle or run animations depending on the velocity
                second paramater of play is ignoreIfPlaying
                @param ignoreIfPlaying — If an animation is already playing
                then ignore this call.
        */
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true);
            this.play('run', true);
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
            this.play('run', true);

        } else {
            this.setVelocityX(0);
            this.play('idle', true);
        }
    }
}

// export Player class to be used in index.js
export default Player;