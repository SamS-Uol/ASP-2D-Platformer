// a class that handles all preload functionality
// to be loaded before any other scene in index.js!!

// import Phaser from 'phaser';

class Preload extends Phaser.Scene {
    
    constructor() {
        super('PreloadScene');
    }
    
    // loads all assets into memory
    preload() {
        this.load.tilemapTiledJSON('crystal_world_map', 'assets/tilemaps/world_map_crystal.json');
        this.load.image('tiles-1', 'assets/art_maps/crystal_world/main_lev_build_1.png')
    }

    // by default, loads the PlayScene after preloading assets
    create() {
        this.scene.start('PlayScene');
    }
}

// export Preload class to be used in index.js
export default Preload;