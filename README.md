# Agile Software Practices Group Project

University of London Group: cm2020-agil-t3g4-2gh's project for Agile Software Practices

## The Project

This project is a 2D platformer game made in Phaser.js. It's made 
with object oriented and agile software practices, as well as git/version control.

- contains tile based maps as levels
- a player that can move left, right, jump, and collides appropriately with platforms
- idle, run, and jump animations with proper transitions
- enemies patrol back and forth
- knockback feature with invincibility buffer and animation
- full screen mode

## Goal

- Navigate each carefully crafted level while fighting you way through enemies and jumping on platforms!

## Controls

- Use the arrows keys to move left and right
- Space or the up arrow key to jump
- Z to maximize screen

## Screenshots

![sample_level_screenshot](/game/assets/screenshots/entry%20-%20level1.png)
![sample_level_screenshot](/game/assets/screenshots/jumping%20over%20enemy%20-%20level1.png)
![sample_level_screenshot](/game/assets/screenshots/taking%20damage%20-%20level1.png)


## More features to come!

- Fighting functionality
- Updated levels
- Collectables
- Sound

## Specifications

- Project built with Phaser.js, Tiled, Node, and Github
- Phaser, version 3.50.0 - https://phaser.io/ 
- Tiled, version 1.8.5 - https://www.mapeditor.org/
- Node, version 16.15.1 - https://nodejs.org/en/
- Github repo - https://github.com/samsherrod/2D-Platformer

-Artwork created by szadiart.itch.io
-Artist states: "You can use this asset personally and commercially."

-Heart GUI found on https://digitherium.com/blog/phaser-platformer-series-13-hearts-lives/

## References:

- https://phaser.io/learn
- https://phaser.io/examples
- https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
- https://photonstorm.github.io/phaser3-docs/
- https://github.com/photonstorm/phaser3-project-template
- https://phaser.discourse.group/
- https://academy.zenva.com/
- https://www.youtube.com/c/WiLDDesigns
- https://www.youtube.com/user/WClarkson
- https://www.youtube.com/watch?v=QGDeafTx5ug&t=604s - Blackthornprod - Double Jump
- https://phasergames.com/
- https://www.youtube.com/watch?v=69Sm2NbvlZ4 - Jonathon Cooper, Hosting your game on GitHub
- https://www.codecademy.com/learn/learn-phaser
- https://www.codecademy.com/learn/paths/create-video-games-with-phaser
- https://www.codecademy.com/learn/introduction-to-javascript
- https://www.codecademy.com/learn/learn-intermediate-javascript
- https://www.codecademy.com/learn/javascript-errors-debugging
- https://www.udemy.com/course/cpp-fundamentals/
- https://www.udemy.com/course/unitycourse/
- https://www.udemy.com/course/game-development-in-js-the-complete-guide-w-phaser-3/
- https://learn.unity.com/course/beginning-2d-game-development
- https://learn.unity.com/project/2d-platformer-template
- https://learn.unity.com/project/ruby-s-2d-rpg
- https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser
- https://docs.github.com
- https://doc.mapeditor.org/en/stable/
- https://www.youtube.com/watch?v=ZwaomOYGuYo
- https://www.youtube.com/watch?v=SIYNuXdDClU
- https://digitherium.com/blog/phaser-platformer-series-13-hearts-lives/

- various other help articles from stack overflow and youtube

## To view the project from anywhere:

Go to https://github.com/samsherrod/2D-Platformer/website to view and access it directly.
Upon clicking the game link (section #3), game/dist is loaded from the gh-pages branch that contains only the build files.

## To edit the project:

- Clone or download repository from https://github.com/samsherrod/2D-Platformer/website
- Navigate to the command line in the root folder called 2D-Platformer
- install node_modules if it is not already installed (npm install)

- NOTE TO VIEW: type npm start and project should load on your browser at localhost:8080

- INSERT CODE IN BETWEEN npm start AND npm build to edit project files

- running npm start will delete the dist folder (the build folder) so type npm run build to recreate the dist folder and re-build it
- After rebuilding the project, you can now view the updated build by clicking on the Live Preview button in Brackets or the Go Live button in Visual Studio for instance without typing npm start

- NOTE TO UPLOAD CHANGES TO REPOSITORY: type npm run deploy to upload the build files (dist folder) onto the gh-pages branch on the repository (https://github.com/samsherrod/2D-Platformer). The gh-pages branch only contains the build files and not the entire project.