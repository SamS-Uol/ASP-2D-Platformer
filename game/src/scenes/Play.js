import Player from '../Characters/Player/Player.js';
import Enemies from '../Characters/Enemies/Enemies.js';
import EventEmitter from '../Emitter.js';

/** Class that sets up the main game functionality. 
 * Creates initial scene, tilemap, tile layers, player and enemies */
class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;
    }
      
    /** Sets up the game including the map, spawn locations, the player,
     *  and the enemies */
    create({gameStatus: gameState})
    {
        // Game initially fades in after 1 second
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerSpawns = this.getPlayerSpawns(layers.playerSpawns);
        const player = this.createPlayer(playerSpawns.sceneEntrance);
        const enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders);

        this.createBackground(map);

        // custom function that allows the player to collide with any layer
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        // custom function that allows the player to collide with any layer
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        });
        

        this.createSceneExit(playerSpawns.sceneExit, player)
        this.setupCameraToFollow(player);

        // When the game is restarted, the emitter continues to call this.createGameEvents()
        // many times. By setting the game state and returning if the player is dead, then it
        // only calls the function once and returns. For memory efficieny.
        // - https://www.udemy.com/course/game-development-in-js-the-complete-guide-w-phaser-3/
        if (gameState === 'PLAYER_DEAD') { return; }
        this.createGameEvents();

        this.enableFullScreenMode();
    }

    /** Adds background sprites, and adjusts scrolling factor. Only needs one sprite, and set
     * the scroll factor to 0 in the x so it will not scroll left or right. Set the y scroll
     * factor to 1 so that it will scroll when camera goes up or down.
     */
    createBackground(map) {
        const backgroundObject = map.getObjectLayer('background-spikes').objects[0];

        this.spikesImage = this.add.tileSprite(
            backgroundObject.x,
            backgroundObject.y,
            this.config.width,
            backgroundObject.height,
            'bg-spikes-dark')
            .setOrigin(0, 1)
            .setDepth(-5)
            .setScrollFactor(0, 1); //A value of 1 means it will move exactly in sync with a camera.

        this.skyImage = this.add.tileSprite(
            0,
            0,
            this.config.width,
            180, // 180 is the height in pixels of the image
            'sky-dark')
            .setOrigin(0, 0)
            .setDepth(-6)
            .setScale(1.1)
            .setScrollFactor(0, 1)
      }

    // https://phaser.io/examples/v3/view/input/keyboard/single-keydown-event
    // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/fullscreen/
    /** enables or disables full screen mode - press Z to activate
     contains error handling in the event that enabling fullscreen does not work.
     BUG: Cannot enter fullscreen after game has restarted. Currently only works
     if game has not restarted. */
    enableFullScreenMode() {
        this.input.keyboard.on('keydown-Z', function (event) {
            try {
                if (this.scene.scale.isFullscreen) {
                    this.scene.scale.stopFullscreen();
                    // On stop fulll screen
                } else {
                    this.scene.scale.startFullscreen();
                    // On start fulll screen
                }
            }
            catch(err) {
                console.log('Error is ' + err);
            }
        });
    }

    /** Returns a tilemap the tilesetImage added to it. */
    createMap() {
        // create a tilemap after loading the Tiled json tilemap file in the preload class
        // by referencing the key 'crystal_world_map' 
        // (from the .json tile map named 'world_map_crystal.json')
        const map = this.make.tilemap({key: 'crystal_world_map'});

        // Adds an image to the map to be used as a tileset.
        // Image is loaded from preload class with the appropriate tileset name,
        // which can be found in the json file
        map.addTilesetImage('crystal_tileset_lev1', 'tiles-1');
        map.addTilesetImage('bg_spikes_tileset', 'background-spikes-tileset');
        return map;
    }

    /** Creating environment and platform layers from tileset. */
    createLayers(map) {
        const tileset1 = map.getTileset('crystal_tileset_lev1');
        const tilesetBackground = map.getTileset('bg_spikes_tileset');

        // adds the solid background tileset from Tiled
        map.createStaticLayer('background-solid', tilesetBackground).setDepth(-7);

        // ORDER OF CODE MATTERS - platforms_collider is behind environment layer
        // end environment layer is behind platforms layer
        const platformsColliders = map.createLayer('platforms_colliders', tileset1).setVisible(false);
        const environment = map.createLayer('environment', tileset1).setDepth(-2);
        const platforms = map.createLayer('platforms', tileset1);
        const playerSpawns = map.getObjectLayer('player_spawns');
        const enemySpawns = map.getObjectLayer('enemy_spawns');

        // https://phaser.io/examples/v3/view/tilemap/set-colliding-by-property
        /* Instead of setting collision by index, you can set collision via properties that you set up
         in Tiled. You can assign properties to tiles in the tileset editor.
         The platforms_colliders layer only has tiles with a boolean "collides" property,
         so by seting this layer to collides: true, every tile in this layer is collidable */
        platformsColliders.setCollisionByProperty({collides: true});

        return { environment, platforms, platformsColliders, playerSpawns, enemySpawns };
    }

    /** Adds the listener for the event when the player is dead. Is called when the player's
     * health is less than or equal to 0 from the Player class. Camera fades out, then the
     * scene restarts. */
    createGameEvents() {
        EventEmitter.on('PLAYER_DEAD', () => {
            // fade to black after 2 second
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            // after 3 seconds, game is restarted
            this.time.delayedCall(3000, () => {
                this.scene.restart({gameStatus:"PLAYER_DEAD"});
            });
        })
      }

    /** creates the player from a new instance of the player class at the x and y
     *  position of the sceneEntrance point in Tiled */
    createPlayer(sceneEntrance) {
        return new Player(this, sceneEntrance.x, sceneEntrance.y);
    }

    /** Creates an array of all enemies regardless of the type in order
      to be able to group all enemies together.
      At each iterated spawnPoint in the enemySpawns layer, looks up the keys of each
      enemyType by accessing the enemy's spawnPoint.type, and then creates a new enemy
      of that type at that enemy's spawnPoint.x/.y properties with the enemy being able
      to collide. It then adds each enemy to an array and returns that array in order
      to be able to group all enemies together.
    */
    createEnemies(spawnLayer, platformsColliders) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();
    
        spawnLayer.objects.forEach(spawnPoint => {
          const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
          enemy.setPlatformColliders(platformsColliders)
          enemies.add(enemy);
        })

        return enemies;
    }

    /** Executes functionality when player collidesWith enemy game object */
    onPlayerCollision(enemy, player) {
        player.collidesWith(enemy);
      }

    /** Adds colliders to player. */
    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformsColliders);
    }

    /** Adds colliders to the group of enemies. Calls onPlayerCollision
     * to execute what happens if player collides with enemy game object. */
    createEnemyColliders(enemies, { colliders }) {
        enemies
            .addCollider(colliders.platformsColliders)
            .addCollider(colliders.player, this.onPlayerCollision);
    }

    /** Creates main camera that follows player, size of camera is confined to the 
     * maps width and height. Parameters are defined in config in index.js */
    setupCameraToFollow(player) {
        const {mapWidth, mapHeight, zoomFactor} = this.config;

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight + 200);
        const mainCamera = this.cameras.main;
        mainCamera.setBounds(0, 0, mapWidth, mapHeight);
        mainCamera.setZoom(zoomFactor);
        mainCamera.startFollow(player);
        return mainCamera;
    }

    /** Returns the scene entrance and scene exit objects that the player 
     * enters and exits from for each scene */
    getPlayerSpawns(playerSpawnLayer) {
        const playerSpawns = playerSpawnLayer.objects;
        return {
            sceneEntrance: playerSpawns.find(spawn => spawn.name === 'sceneEntrance'),
            sceneExit: playerSpawns.find(spawn => spawn.name === 'sceneExit')
        }
    }

    /** Takes the scene exit point and spans it across the height of the level. You
     * can addjust the size to ensure the player exits the level from the right location.
     * Otherwise, the player must intersect the exact location of the exit location.
     */
    createSceneExit(exit, player) {
    const endOfScene = this.physics.add.sprite(exit.x, exit.y, 'sceneExit')
    .setSize(5, this.config.height * 2)
    .setOrigin(0.5, 1)
    .setAlpha(0);

    // Player has reached edge of scene - LOAD NEW SCENE HERE!!
    this.physics.add.overlap(player, endOfScene, () => {
        console.log("Player has reached the edge of scene");
        })
    }

    /** updates the art to move at the parallax rate*/
    update() {
        this.createParallax(this.config.parrallaxX, this.config.parrallaxY);
    }

    /** background art scrolls at a different rate than the camera to create the
     * illusion of depth
     */
    createParallax(parallax_x, parallax_y) {
        this.spikesImage.tilePositionX = this.cameras.main.scrollX * parallax_x;
        this.skyImage.tilePositionX = this.cameras.main.scrollX * parallax_y;
    }
}

// export Play class to be used in index.js
export default Play;