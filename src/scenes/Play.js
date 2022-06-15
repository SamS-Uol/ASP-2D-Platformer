// class that sets up game
// creates map, layers, and player

import Player from '../Player.js';

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }
      
    create ()
    {
        const map = this.createMap();
        const layers = this.createLayers(map);

        this.player = this.createPlayer();
        this.playerSpeed = 200;

        // create collider between player and the platformColliders layer
        this.physics.add.collider(this.player, layers.platformsColliders);

        // create basic inputs for handling player movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createMap() {
        // create a tilemap from the json tile map named 'map' in the preload class
        const map = this.make.tilemap({key: 'crystal_world_map'});

        // adding the image from preload class with the appropriate tileset name
        map.addTilesetImage('crystal_tileset_lev1', 'tiles-1');

        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset('crystal_tileset_lev1')

        // creating environment and platform layers from tileset
        // ORDER OF CODE MATTERS - environment layer is behind platforms layer
        const platformsColliders = map.createLayer('platforms_colliders', tileset1);
        const environment = map.createLayer('environment', tileset1);
        const platforms = map.createLayer('platforms', tileset1);

        // https://phaser.io/examples/v3/view/tilemap/set-colliding-by-property
        // Instead of setting collision by index, you can set collision via properties that you set up
        // in Tiled. You can assign properties to tiles in the tileset editor. Note: you need
        // to NOT have the collision editor or terrain editor open when you set them up.
        // This map has tiles with a boolean "collides" property, so we can do the following:
        platformsColliders.setCollisionByProperty({collides: true});

        return { environment, platforms, platformsColliders };
    }

    createPlayer() {
        return new Player(this, 50, 80);
    }
}

// export Play class to be used in index.js
export default Play;