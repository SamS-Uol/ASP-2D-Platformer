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
const MAP_WIDTH = 1600;

// width and height of the scene - change here to adjust size of scene
// const WIDTH = document.body.offsetWidth
// const HEIGHT = document.body.height;
const WIDTH= window.innerWidth * window.devicePixelRatio;
const HEIGHT= window.innerHeight * window.devicePixelRatio;


/* offsetWidth is a measurement in pixels of the element's CSS width,
 including any borders, padding, and vertical scrollbars (if rendered).
 https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
*/


// create a custom config object that can be shared between all scenes
/*
 mapOffset is the area outside of what's shown on the screen - since
 the canvas width is not as large as the map_width, the camera will need
 access to the rest of the width of the map to scroll properly. If the
 MAP_WIDTH is 1600px, and the width of the document.body is 1280px, then
 the mapOffset is 320px

 mapOffset is equal to the value from the ternary operation. Same as
 if (MAP_WIDTH > WIDTH) MAP_WIDTH - width;
 else 0;
*/ 
const SHARED_CONFIG = {
    mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    width: WIDTH,
    height: HEIGHT,
    zoomFactor: 2,
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
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     parent: 'phaser-example',
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    physics: {
        // Arcade physics plugin, manages physics simulation
        default: 'arcade',
        arcade: {
            // debug: true // uncomment to turn debug mode on for all physics objects in scene
        }
    },
    // loads whichever scenes are in the Scenes array
    scene: initScenes()
}

// creates a new Phaser game with the config settings from the Phaser.Game instance
// responsible for setting up game, will not run without it
new Phaser.Game(config)