// imports files
// phaser is from NPM
// Scenes are imported from scenes folder under src
import Phaser from 'phaser';

import PlayScene from'./scenes/Play';
import PreloadScene from'./scenes/Preload';

// width and height of the scene - change here to adjust size of scene
const WIDTH = 800;
const HEIGHT = 600;

// create a custom config object that can be shared between all scenes
const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
}

// create array of scenes
const Scenes = [PreloadScene, PlayScene];

// store the new Scene function into the variable createScene
const createScene = Scene => new Scene(SHARED_CONFIG)

// iterate through each element in scenes and create a new scene with SHARED_CONFIG paramaters
const initScenes = () => Scenes.map(createScene)

const config = {
    // WebGL (Web graphics Library) JS Api for rendering 2D and 3D graphics
    type: Phaser.AUTO,
    // setups config file with the shared_config paramaters
    ...SHARED_CONFIG,
    //keeps pixel art crisp
    pixelArt: true,
    physics: {
        // Arcade physics plugin, manages physics simulation
        default: 'arcade',
        arcade: {
            debug: true // uncomment to turn debug mode on for all physics objects in scene
        }
    },
    // loads whichever scenes are in the Scenes variable
    scene: initScenes()
}

// creates a new Phaser game with the config settings
new Phaser.Game(config)