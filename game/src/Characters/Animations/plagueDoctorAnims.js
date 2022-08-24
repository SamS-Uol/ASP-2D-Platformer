/*
This file is used for storing all of the plagueDoctor animations in a tidy
manner rather than filling up the create method in the plagueDoctor class.
It exports all of the animations into a variable called anims through
a callback function. Import this file into the plagueDoctor class and you 
can use the variable, anims, as if it was written in that class.
*/

// create enemy animations
// note: frames start with index 0
export default anims => {
    anims.create({
        // run animation from frames 0 - 8 from idle,run,jump_sheet.png
        key: 'plagueDoctor-idle',
        frames: anims.generateFrameNumbers('plagueDoctor', {start: 0, end: 12}),
        frameRate: 8, // executes animation per second
        repeat: -1 // continuously runs
    })
}
