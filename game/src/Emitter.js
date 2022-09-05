// a class that creates a new EventEmitter
// necessary to alls each of the listeners registered for a given event
// such as the game state when the player is dead.

// https://phaser.discourse.group/t/solved-custom-event-emitter-communication-across-scenes/529/3
// https://phaser.discourse.group/t/emit-events-across-scenes/666/6

class EventEmitter extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }
}

export default new EventEmitter;