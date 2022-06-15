// a class that handles all preload functionality
// to be loaded before any other scene in index.js!!

// import Phaser from 'phaser';

class Preload extends Phaser.Scene {
    
    constructor() {
        super('PreloadScene');
    }
    
    // loads all assets into memory
    preload() {
        this.load.image('logo', require('../assets/logo.png'));
    }

    // by default, loads the PlayScene after preloading assets
    create() {
        this.scene.start('PlayScene');
    }
}

// export Preload class to be used in index.js
export default Preload;