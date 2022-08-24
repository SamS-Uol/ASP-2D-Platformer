/* A base enemy class that all enemies will inherit from */

// import collidable function from collidable.js
import collidable from "../../ExtendedFeatures/collidable";

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

        this.init();
        this.initEvents();
    }

    // sets up enemy with functionality
    init() {
        // Member variables/enemy properties
        this.gravity = 500;
        this.speed = 150;
        
        // sets vertical gravity
        this.body.setGravityY(this.gravity);
        this.setSize(20, 45);
        this.setOffset(10, 20);
        // ensures the enemy cannot move past the edges of the map        
        this.setCollideWorldBounds(true);
        // enemy won't be able to be moved if enemy collides into it
        this.setImmovable(true);
        //sets origin of the sprite to be the in the middle and bottom so that it collides properly
        this.setOrigin(0.5, 1);
    }

    // sets the event listeners
    // necessary for updating animations
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    // responsible for updating all enemies that are derived from this class every frame. Add
    // functionality in here that will affect all enemies such as movement, logic, combat, etc.
    update(time, delta) {
        this.setVelocityX(30);
    }
}

// export plagueDoctor class to be used in index.js
export default Enemy;