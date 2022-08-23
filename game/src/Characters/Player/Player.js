/* A class to create the player that is a sprite

Documention: An Arcade Physics Sprite is a Sprite
with an Arcade Physics body and related components.*/

// import player animations
import initAnimations from './playerAnims';
// import collidable function from collidable.js
import collidable from '../../mixins/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
    // creates a player object with the 'player' key image from the preload class
    // scene is the scene the player will appear in at x and y cooridinates
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // creates sprite of player
        scene.add.existing(this);
        // add the physics rules to this arcade sprite
        scene.physics.add.existing(this);

        // MIXINS
        // Copies the collidable function from the collidable object in 
        // collidable.js to the player object, and returns the player object
        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    // sets up player with functionality
    init() {
        // Member variables/player properties
        this.gravity = 500;
        this.playerSpeed = 150;
        this.jumpForce = 300;

        // tracks if you've jumped, only incremented when player has jumped
        // starts at 1 
        this.jumpCount = 1;
        // maximum number of jumps player can have in air
        this.maxJumps = 2;


        // create basic inputs for handling player movement
        // Documentation: Creates and returns an object containing 4 hotkeys
        // for Up, Down, Left and Right, and also Space Bar and shift.
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        // adjusts player's size
        this.body.setSize(20, 36);
        this.setOffset(10, 25);
        // sets vertical gravity
        this.body.setGravityY(this.gravity);
        // ensures the player cannot move past the edges of the map
        this.setCollideWorldBounds(true);
        //sets origin of the sprite to be the in the middle and bottom so that it collides properly
        this.setOrigin(0.5, 1);

        // call to create player animations from playerAnims.js
        initAnimations(this.scene.anims);
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
        this.handleMovementControls(time, delta);
    }

    handleMovementControls(time, delta) {
        // Game CONTROLS
        // handling player movement, add movement properties here
        const { left, right, space, up } = this.cursors;
        // The justDown value allows you to test if this Key has just been pressed down or not.
        // ensuers space and up keys are just pressed one time, - necessray for creating
        // multiple jumps in the air like double jump
        const isSpaceButJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpButJustDown = Phaser.Input.Keyboard.JustDown(up);

        // if the player's body is touching a tile or the world boundary while moving down.
        const onFloor = this.body.onFloor();

        /* moves player left, right, or stops
            flips character when pressing left or right
            plays idle or run animations depending on the velocity
                second paramater of play is ignoreIfPlaying
                @param ignoreIfPlaying — If an animation is already playing
                then ignore this call.
        */
        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        /* if space key OR up arrow key has just been pressed down
           AND
           player is on the floor OR jumpCount is less than maxJumps,
           move up player upward by the jumpForce value, and increment the jumpCount by 1
    
           if space.isDown or up.isDown is replaced, update will call it multiple times
           as long as the buttons are pressed down, JustDown(space) will call it only once
         */
        if ((isSpaceButJustDown || isUpButJustDown) &&
            (this.jumpCount < this.maxJumps)) {
            this.setVelocityY(-this.jumpForce);
            this.jumpCount++;
        }

        // resets jumpCount when player collides back with a tile or world boundary when moving down
        if (onFloor) {
            this.jumpCount = 1;
        }

        if (onFloor) {
            if (this.body.velocity.x !== 0)
                this.play('run', true);
            else
                this.play('idle', true);
        } else
            this.play('jump', true);
    }
}

// export Player class to be used in index.js
export default Player;