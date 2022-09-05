// import collidable function from collidable.js
import Enemy from './Enemy';
import initAnims from '../Animations/plagueDoctorAnims';

/** A class to create the plagueDoctor enemy.
 * Inherits from Enemy class */
class PlagueDoctor extends Enemy {
    // creates a plagueDoctor enemy object with the 'plagueDoctor' key image from the preload class
    // scene is the scene the enemy will appear in at x and y cooridinates
    constructor(scene, x, y) {
        super(scene, x, y, 'plagueDoctor');
        
        // call to create plagueDoctor animations from plagueDoctorAnims.js
        initAnims(scene.anims);
    }

    /** Calls this class' update first, then the update method in the Enemy class (super.update) 
     * calls all update functionality from the Enemy class, then executes all update 
     * functionality that is ONLY specific to THIS class */
    update(time, delta) {
        super.update(time, delta);

        // Upon restarting scene, enemy is not active, so it returns. Otherwise it would execute
        // animation not being active and an error would occur.
        if (!this.active) { return; }

        // plays plagueDoctor idle animation
        this.play('plagueDoctor-idle', true);
    }
}

// export plagueDoctor class to be used in index.js
export default PlagueDoctor;