// a class that handles all preload functionality
// to be loaded before any other scene in index.js!!

class Preload extends Phaser.Scene {
    
    constructor() {
        super('PreloadScene');
    }
    
    // loads all assets into memory
    preload() {
        // loads tilemap json file - look up json file for detailed info
        this.load.tilemapTiledJSON('crystal_world_map', 'assets/tilemaps/world_map_crystal.json');
        // loads the original artwork
        this.load.image('tiles-1', 'assets/art_maps/crystal_world/main_lev_build_1.png')
    
        // loads the movement sprites and slices sheet into frames with required properties
        this.load.spritesheet('player','assets/characters/Gino Character/PNG/idle,run,jump_sheet.png', {
            frameWidth: 32, frameHeight: 64, spacing: 32
        });
    }

    // by default, loads the PlayScene after preloading assets
    create() {
        this.scene.start('PlayScene');
    }
}

// export Preload class to be used in index.js
export default Preload;