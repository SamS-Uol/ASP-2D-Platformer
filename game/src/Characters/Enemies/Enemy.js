/* A class to create a base enemy class that all enemies will inherit from */

// import collidable function from collidable.js
import collidable from '../../mixins/collidable';

class Enemy extends Phaser.Physics.Arcade.Sprite {
    // creates a plagueDoctor enemy object with the 'plagueDoctor' key image from the preload class
    // scene is the scene the enemy will appear in at x and y cooridinates
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // creates sprite of enemy
        scene.add.existing(this);
        // add the physics rules to this arcade sprite
        scene.physics.add.existing(this);

        // MIXINS
        // Copies the collidable function from the collidable object in 
        // collidable.js to the enemy object, and returns the enemy object
        Object.assign(this, collidable);

        this.init();
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
}

// export plagueDoctor class to be used in index.js
export default Enemy;