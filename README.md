# Agile Software Practices Group Project

University of London Group: cm2020-agil-t3g4-2gh's project for Agile Software Practices

## The Project

This project is a 2D platformer game made in Phaser.js. It's made 
with object oriented and agile software practices, as well as git/version control.

- contains tile based maps as levels
- a player that can move left, right, jump, and collides appropriately with platforms
- idle, run, and jump animations with proper transitions

## Goal

- Navigate each carefully crafted level while fighting you way through enemies and jumping on platforms!

## Controls

- Use the arrows keys to move left and right, and space or the up arrow key to jump

## Screenshots

![sample_level_screenshot](/assets/screenshots/2d_platformer_sample_img.png)

## More features to come!

- Enemies
- Fighting and health functionality
- Updated levels
- Collectables
- Sound

## Specifications

- Project built with Phaser.js, Tiled, Node, and Github
- Phaser, version 3.50.0 - https://phaser.io/ 
- Tiled, version 1.8.5 - https://www.mapeditor.org/
- Node, version 16.15.1 - https://nodejs.org/en/
- Github repo - https://github.com/tzahiuol/agile-software-projects/tree/SamSherrod-patch-1

-Artwork created by szadiart.itch.io
-Artist states: "You can use this asset personally and commercially."

## References:

- https://phaser.io/learn
- https://photonstorm.github.io/phaser3-docs/
- https://github.com/photonstorm/phaser3-project-template
- https://phaser.discourse.group/
- https://academy.zenva.com/
- https://www.youtube.com/user/WClarkson
- https://www.youtube.com/watch?v=69Sm2NbvlZ4 - Jonathon Cooper, Hosting your game on GitHub
- https://www.codecademy.com/learn/learn-phaser
- https://www.codecademy.com/learn/paths/create-video-games-with-phaser
- https://www.udemy.com/course/game-development-in-js-the-complete-guide-w-phaser-3/
- https://docs.github.com
- https://doc.mapeditor.org/en/stable/

- various other help articles from stack overflow and youtube

## To view the project:

Clone or download the repository https://github.com/tzahiuol/agile-software-projects/tree/gh-pages. This contains only the build files -index.js, and phaser.min.js, bundle.min.js (build file), as well as a folder containing all of the assets and a scripts folder containing phaser.min.js

## To edit the project:

- Clone or download repository from https://github.com/tzahiuol/agile-software-projects/tree/SamSherrod-patch-1
- go to command line in root folder, agile-software-projects
- install node_modules if it is not already installed (npm install)

- NOTE TO VIEW: type npm start and project should load on your browser at localhost:8080

- INSERT CODE IN BETWEEN npm start AND npm build to edit project files

- running npm start will delete the dist folder (the build folder) so type npm run build to recreate the dist folder and re-build it
- *** VERY IMPORTANT - COPY the asset folder and the scripts folder into the dist folder now that the dist folder is created. It should contain two folders (assets and scripts) and two files (bundle.min.js, and index.html)
- you can view the project now with your updated changes and it being rebuilt by clicking on the Live Preview button in Brackets or the Go Live button in Visual Studio for instance without typing npm start


- NOTE TO UPLOAD CHANGES TO REPOSITORY: type npm run deploy to upload the build files (dist folder) onto the gh-pages branch on the repository (https://github.com/tzahiuol/agile-software-projects/tree/gh-pages). The gh-pages branch only contains the build files and not the entire project.