// import Phaser from "phaser";

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }
      
    create ()
    {
        const map = this.make.tilemap({key: 'crystal_world_map'});
        const tileset1 = map.addTilesetImage('crystal_tileset_lev1', 'tiles-1');

        map.createLayer('environment', tileset1);
        map.createLayer('platforms', tileset1);
    }
}

export default Play;