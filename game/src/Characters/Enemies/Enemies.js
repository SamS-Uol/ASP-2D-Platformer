// Phaser.GameObjects.Group class
//https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html

import { ENEMY_TYPES } from "./EnemyTypes";
import collidable from "../../ExtendedFeatures/collidable";

/** Classes to group all enemies - inherits from the */
class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    /** Returns all enemy types that are listed in EnemyTypes.js */ 
    getTypes() {
        return ENEMY_TYPES;
    }
}

export default Enemies;