/*
This file is used for storing all of the player animations in a tidy
manner rather than filling up the create method in the Player class.
It exports all of the animations into a variable called anims through
a callback function. Import this file into the Player class and you 
can use the variable, anims, as if it was written in that class.
*/

// create player animations
// note: frames start with index 0
export default anims => {
    anims.create({
        // run animation from frames 0 - 8 from idle,run,jump_sheet.png
        key: 'idle',
        frames: anims.generateFrameNumbers('player', {start: 0, end: 8}),
        frameRate: 8, // executes animation per second
        repeat: -1 // continuously runs
    })
    
    anims.create({
        // run animation from frames 11 - 16 from idle,run,jump_sheet.png
        key: 'run',
        frames: anims.generateFrameNumbers('player', {start: 11, end: 16}),
        frameRate: 8, // executes animation per second
        repeat: -1 // continuously runs
    })
    
    anims.create({
        // run animation from frames 17 - 23 from idle,run,jump_sheet.png
        key: 'jump',
        frames: anims.generateFrameNumbers('player', {start: 17, end: 23}),
        frameRate: 2, // executes animation per second
        repeat: 1 // runs only once
    })
}
