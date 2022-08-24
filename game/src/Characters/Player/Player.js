/* A class to create the player that is a sprite

Documention: An Arcade Physics Sprite is a Sprite
with an Arcade Physics body and related components.*/

// import player animations
import initAnimations from '../Animations/playerAnims';
// import collidable function from collidable.js
import collidable from '../../ExtendedFeatures/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
    // creates a player object with the 'player' key image from the preload class
    // scene is the scene the player will appear in at x and y cooridinates
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // creates sprite of player
        scene.add.existing(this);
        // add the physics rules to this arcade sprite
        scene.physics.add.existing(this);

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
        this.extraJumps = 2;

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
        this.handlePlayerControls(time, delta);
    }

    handlePlayerControls(time, delta) {
        // Game CONTROLS
        // handling player movement, add movement properties here
        const { left, right, space, up} = this.cursors;

        this.handleMovement(left, right);
        this.handleJump(space, up);
        this.handleJumpLogic();
    }

    handleMovement(left, right) {
        /* moves player left, right, or stops
           flips character when pressing left or right
           plays idle or run animations depending on the velocity
               second paramater of play is ignoreIfPlaying
               @param ignoreIfPlaying — If an animation is already playing
               then ignore this call.
        */

        const aKey = this.scene.input.keyboard.addKey('A');
        const dKey = this.scene.input.keyboard.addKey('D');

        if (left.isDown || aKey.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown|| dKey.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }
    }

    handleJump(space, up) {

        // The justDown value allows you to test if this Key has just been pressed down or not.
        // ensures space and up keys are just pressed one time, - necessray for creating
        // multiple jumps in the air like double jump

        /* if space key OR up arrow key has just been pressed down
           AND
           player is on the floor OR jumpCount is less than maxJumps,
           move up player upward by the jumpForce value, and increment the jumpCount by 1
    
           if space.isDown or up.isDown is replaced, update will call it multiple times
           as long as the buttons are pressed down, JustDown(space) will call it only once
         */
        // if the player's body is touching a tile or the world boundary while moving down.

        const isSpaceButJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpButJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isWButJustDown = Phaser.Input.Keyboard.JustDown(this.scene.input.keyboard.addKey("W"));

        if ((isSpaceButJustDown || isUpButJustDown || isWButJustDown) &&
            (this.extraJumps > 0)) {
                console.log("can jump")
            this.setVelocityY(-this.jumpForce);
            this.extraJumps--;
            console.log("extraJumps is " + this.extraJumps);
        }
    }

    handleJumpLogic(space, up) {
        const onFloor = this.body.onFloor();

        // logic for handling player animations
        if (onFloor)
        {
            // resets jumpCount when player collides back with a tile or world boundary when moving down
            // and if the extra jumps have been used
            /* BUG HERE, this.extraJumps should just be reset, problem seems to be with onFloor.
               Maybe there is a bug with Phaser. Tried multiple ways to get around it, and still
               keep running into problem.
                    BUG is that when you jump once and land, animation plays correctly, When you
                    jump again and this.extraJumps = 0, the animation does not play */
            if (this.extraJumps === 0) this.extraJumps = 2;

            if (this.body.velocity.x !== 0)
                this.play('run', true);
            else
                this.play('idle', true);
        } 
        else
        {
            if (this.extraJumps === 1) this.play('jump1', true);
            else if (this.extraJumps === 0) this.play('jump2', true);
        }
    }
}

// export Player class to be used in index.js
export default Player;