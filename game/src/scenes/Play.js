// class that sets up the game functionality
// creates tilemap, tile layers, and player

// imports the Player class to create a new player
import Player from '../Player.js';

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;
    }
      
    // sets up the game
    create ()
    {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones);

        // custom function that allows the player to collide with any layer
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        this.setupCameraToFollow(player);
    }

    createMap() {
        // create a tilemap after loading the Tiled json tilemap file in the preload class
        // by referencing the key 'crystal_world_map' 
        // (from the .json tile map named 'world_map_crystal.json')
        const map = this.make.tilemap({key: 'crystal_world_map'});

        // Adds an image to the map to be used as a tileset.
        // Image is loaded from preload class with the appropriate tileset name,
        // which can be found in the json file
        map.addTilesetImage('crystal_tileset_lev1', 'tiles-1');

        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset('crystal_tileset_lev1')

        // creating environment and platform layers from tileset
        // ORDER OF CODE MATTERS - platforms_collider is behind environment layer
        // end environment layer is behind platforms layer
        const platformsColliders = map.createLayer('platforms_colliders', tileset1);
        const environment = map.createLayer('environment', tileset1);
        const platforms = map.createLayer('platforms', tileset1);
        const playerZones = map.getObjectLayer('player_zones');

        // https://phaser.io/examples/v3/view/tilemap/set-colliding-by-property
        // Instead of setting collision by index, you can set collision via properties that you set up
        // in Tiled. You can assign properties to tiles in the tileset editor.
        // The platforms_colliders layer only has tiles with a boolean "collides" property,
        // so by seting this layer to collides: true, every tile in this layer is collidable
        platformsColliders.setCollisionByProperty({collides: true});

        return { environment, platforms, platformsColliders, playerZones };
    }

    // creates the player from a new instance of the player class
    createPlayer({start}) {
        debugger
        return new Player(this, start.x, start.y);
    }

    // adds colliders to player based on collider arguments
    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformsColliders)
    }

    // creates camera that follows player, size of camera is confined to the
    // maps width and height. Parameters are defined in config in index.js
    setupCameraToFollow(player) {
        const {mapWidth, mapHeight, zoomFactor} = this.config;

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight + 200);
        const mainCamera = this.cameras.main;
        mainCamera.setBounds(0, 0, mapWidth, mapHeight);
        mainCamera.setZoom(zoomFactor);
        mainCamera.startFollow(player);
        return mainCamera;
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }
}

// export Play class to be used in index.js
export default Play;