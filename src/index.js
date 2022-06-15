import Phaser from 'phaser';

import PlayScene from './Scenes/PlayScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: PlayScene
};

const game = new Phaser.Game(config);
