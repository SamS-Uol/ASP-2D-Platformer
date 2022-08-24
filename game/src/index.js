/* A class that sets up the config paramater and creates
a game with scenes that are loaded from each scene class

Scenes are imported from scenes folder under src
****** import Phaser from 'phaser' should not be included
        since phaser.min.js is in scripts folder and being
        loaded from index.html
*******/

// import the scenes to be loaded into the game
import PlayScene from'./scenes/Play';
import PreloadScene from'./scenes/Preload';

// size of map, may be bigger than width of document.body
// in tiled each tile is 16 x 16
const MAP_WIDTH = 1600;
const MAP_HEIGHT = 640;

const roundHalf = num => Math.round(num * 2) / 2
export const DPR = roundHalf(window.devicePixelRatio)
// const { width, height } = window.screen

// // base resolution is 360x640 @4
// const WIDTH = Math.max(width, height) * DPR
// const HEIGHT = Math.min(width, height) * DPR

// // width and height of the scene - change here to adjust size of scene
// const WIDTH = window.innerWidth * window.devicePixelRatio - 16;
// const HEIGHT= window.innerHeight * window.devicePixelRatio - 16;

// https://phaser.discourse.group/t/how-many-pixels-wondering-about-target-resolution/4456/14
// base resolution is 480x270 @4
const isMobile = () => Math.min(window.screen.width, window.screen.height) <= 270;
const WIDTH = 480 * (isMobile() ? DPR : 4);
const HEIGHT = 270 * (isMobile() ? DPR : 4);

// create a custom config object that can be shared between all scenes
const SHARED_CONFIG = {
    mapWidth: MAP_WIDTH,
    mapHeight: MAP_HEIGHT,
    width: WIDTH,
    height: HEIGHT,
    zoomFactor: 2
}

// create array of scenes, order matters! 
// PreloadScene should be first to preload all assets into memory before
// loading a scene
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
            // debug: true // uncomment to turn debug mode on for all physics objects in scene
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'phaser-game',
    // loads whichever scenes are in the Scenes array
    scene: initScenes()
}

// creates a new Phaser game with the config settings from the Phaser.Game instance
// responsible for setting up game, will not run without it
new Phaser.Game(config)