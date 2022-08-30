/* Documention: An Arcade Physics Sprite is a Sprite
with an Arcade Physics body and related components.*/

// import player animations
import initAnims from '../Animations/playerAnims';
// import collidable function from collidable.js
import collidable from '../../ExtendedFeatures/collidable';

/** A class to create the player that is a sprite */
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

    /** Sets up player with functionality. */ 
    init() {
        // Member variables/player properties
        this.gravity = 500;
        this.playerSpeed = 150;
        this.jumpForce = 300;

        // adds an extra jump to the existing jump (1 = double jump, 2 = triple, etc)
        this.extraJumpsValue = 1;
        this.extraJumps = this.extraJumpsValue;

        this.isHit = false;
        this.knockbackVelocity = 250;

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
        initAnims(this.scene.anims);
    }

    /** Sets the event listeners. Necessary for updating animations. */
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    /** When extending from an arcade sprite super class, you must provide time, delta paramaters.
    Necessary for updating sprite animation properly in preUpdate. Runs every frame. */
    update(time, delta) {
        // if player is damaged, controls are disabled, otherwise enable controls
        if (this.isHit) {
            return;
        }

        //enables controls
        this.handlePlayerControls(time, delta);
    }

    /** Handles and enables all player controls and movement logic */
    handlePlayerControls(time, delta) {
        const { left, right, space, up} = this.cursors;
        const isGrounded = this.body.onFloor();

        this.handleMovement(left, right);
        this.handleJump(space, up, isGrounded);
        this.handlePlayerAnim(isGrounded);
    }

    /** Moves player left, right, or stops.
     *  Flips character when pressing left or right. */
    handleMovement(left, right) {
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

    /**sets the character's y velocity upward by jumpForce and decreases the number of extra
     * jumps by 1 each time a jump button is pressed */
    handleJump(space, up) {
        // The justDown value allows you to test if this Key has just been pressed down or not.
        // ensures space and up keys are just pressed one time, - necessray for creating
        // multiple jumps in the air like double jump

        const isSpaceButJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpButJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isWButJustDown = Phaser.Input.Keyboard.JustDown(this.scene.input.keyboard.addKey("W"));
        
        /* https://www.youtube.com/watch?v=QGDeafTx5ug&t=604s
         Blackthornprod - 2D DOUBLE / TRIPLE JUMP PLATFORMER CONTROLLER - EASY UNITY TUTORIAL*/
        
         if ((isSpaceButJustDown || isUpButJustDown || isWButJustDown) && 
            (this.extraJumps > 0)) {
            this.setVelocityY(-this.jumpForce);
            this.extraJumps--;
        }
    }

    /** Switches player's animations depending on the x velocity value and if player is jumping.
     * Also resets extraJumps. */
    handlePlayerAnim(isGrounded) {
        /*  second paramater of play is ignoreIfPlaying
            @param ignoreIfPlaying — If an animation is already playing
            then ignore this call.
        */
        if (isGrounded) {
            // resets jumps
            this.extraJumps = this.extraJumpsValue;
            if (this.body.velocity.x !== 0) {
                this.play('run', true)
            }
            else {
                this.play('idle', true)
            }
        }
        else
        {
            // two different jump anims so that it can restart the jump anim
            if (this.extraJumps === 1) this.play('jump1', true);
            else if (this.extraJumps === 0) this.play('jump2', true);
        }
    }

    /**Every 200 milliseconds, character turns black and then back to its
     * original tint to emulate a blinking effect for when player takes damage.
     * https://phaser.io/examples/v3/category/tweens
     * https://photonstorm.github.io/phaser3-docs/Phaser.Tweens.TweenManager.html */
    playDamageTween() {
        // currently runs for 200 milliseconds (100 * 2);
        return this.scene.tweens.add({
          targets: this,
          duration: 100,
          repeat: -1,
          tint: 0xffffff
        })
      }

    /** Checks if the player is colliding with a game object such as an enemy.
     * Put code in here to implement interactions if a player collides with a
     * game object. This could include, lowering health, dying, being knocked
     * backwards, etc. */
    collidesWith(gameObject) {
        console.log("player has been hit", gameObject);

        if (this.isHit) {
            return;
        }
        this.isHit = true;
        this.isKnockedBackwards();
        const hitAnim = this.playDamageTween();

        // Creates a Timer Event and adds it to the Clock at the start of the frame.
        // After 1 second (1000 milliseconds), player hasBeenHit is false, sets player
        // sprite tint back to original state after changing from playDamageTween,
        // controls are enabled
        // https://photonstorm.github.io/phaser3-docs/Phaser.Time.Clock.html
        this.scene.time.delayedCall(1000, () => {
            this.isHit = false;
            hitAnim.stop();
            this.clearTint();
        });        
    }

    /** knocks players backwards and upwards away from a body depending if the 
     * player right or left edge is colliding with a body. */
    isKnockedBackwards() {
        // if player's body is colliding with a body on it's right edge
        if (this.body.touching.right) {
            this.setVelocityX(-this.knockbackVelocity);
        } 
        // if player's body is colliding with a body on it's left edge
        else {
            this.setVelocityX(this.knockbackVelocity);
        }

        setTimeout(() => this.setVelocityY(-this.knockbackVelocity), 0)
    }
}

// export Player class to be used in index.js
export default Player;