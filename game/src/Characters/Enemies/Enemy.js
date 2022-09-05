
// import collidable function from collidable.js
import collidable from "../../ExtendedFeatures/collidable";
import EventEmitter from '../../Emitter.js';

/** A base enemy class that all enemies will inherit from */
class Enemy extends Phaser.Physics.Arcade.Sprite {
    // creates a super class for all  enemy objects - key will be the name of
    // the particular enemy class such as PlagueDoctor.js - "plagueDoctor"
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // creates sprite of enemy
        scene.add.existing(this);
        // add the physics rules to this arcade sprite
        scene.physics.add.existing(this);

       // Copies the collidable function from the collidable object in 
        // collidable.js to the enemy object, and returns the enemy object
        Object.assign(this, collidable);

        // initialize enemy properties
        this.init();
        this.initEvents();
    }

      /** Sets up enemy with functionality */ 
    init() {
        // Member variables/enemy properties
        this.gravity = 500;
        this.speed = 50;

        this.timeFromLastTurn = 0;

        // measured in pixels
        this.maxPatrolDistance = 600;
        // how far enemy has traveled
        this.currentPatrolDistance = 0;

        // Amount of damage the enemies can do to the player. Decreases the same number of hearts
        this.damage = 1;

        this.platformCollidersLayer = null;
        //this.rayGraphics = this.scene.add.graphics({lineStyle: {width: 2, color: 0xaa00aa}});

        // sets vertical gravity
        this.body.setGravityY(this.gravity);
        this.setSize(20, 45);
        this.setOffset(7, 20);
        // ensures the enemy cannot move past the edges of the map        
        this.setCollideWorldBounds(true);
        // enemy won't be able to be moved if enemy collides into it
        this.setImmovable(true);
        //sets origin of the sprite to be the in the middle and bottom so that it collides properly
        this.setOrigin(0.5, 1);
        this.setVelocityX(this.speed);

        this.createGameEvents();
    }

    /** Adds the listener for the event when the player is dead. Is called when the player's
     * health is less than or equal to 0 from the Player class. Forces Enemy to stop moving. */
    createGameEvents() {
        EventEmitter.on('PLAYER_DEAD', () => {
            this.stopMovement();
        });
    }

    /** Sets the event listeners. Necessary for updating animations */
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    /** Responsible for updating all enemies that are derived from this class every frame. Add 
     * functionality in here that will affect all enemies such as enemy movement, logic, combat, etc. */
    update(time) {
        this.patrol(time);
    }

    /** Stops all enemy movement. Call when player has died so that enemies do not keep moving,
     * and colliding with player. First checks that the enemy is active, then stops the
     * movement by setting the velocity to 0 and sets deactivates it. */
    stopMovement() {
        if (this.active) {
            this.setVelocity(0);
            this.setActive(false);
        }
    }

    /** Executes patrol functionality. Essentially uses raycasting to detect if enemy
     * has reached the edge of it's platform or if it has moved a specified distance. If
     * either condition is true, the enemy's sprite flips, moves in the opposite direction,
     * and continues performing the same function. */
    patrol(time) {
        // if enemy doesn't have body, or if they're not grounded on a platform, then
        // exit out of function by returning. Otherwise execute function below
        if (!this.body || !this.body.onFloor()) {
            return;
        }

        // get absolute value so that it is consistent whether enemy is facing
        // left or right to account for negative values
        this.currentPatrolDistance += Math.abs(this.body.deltaX());

        // properties of this.raycast comes from collidable.js
        /******** BUG: cannot make rayLength any shorter or precsision higher 
        without buggy behaviour. Currently enemies cannot move to the edges. ********/
        const { hasHit } = this.raycast(this.body, this.platformCollidersLayer,
            {raylength: 39, precision: 1, steepness: 1});

        // if enemy's ray has collided with a platform or if the enemy has moved
        // a certain distance, flip sprite, and continue moving in the opposite
        // direction
        if ((!hasHit || this.currentPatrolDistance >= this.maxPatrolDistance) &&
            this.timeFromLastTurn + 100 < time) {
            this.setFlipX(!this.flipX);
            this.setVelocityX(this.speed = -this.speed);
            this.timeFromLastTurn = time;
            this.currentPatrolDistance = 0;
        }
    }

    /** Sets the enemies colliders to whatever layer is specified. Currently
     * used in the play scene to set the enemies platform layers to the tiled
     * platform layers
     */
    setPlatformColliders(platformCollidersLayer) {
        this.platformCollidersLayer = platformCollidersLayer;
    }
  }

// export enemy class to be used in index.js
export default Enemy;