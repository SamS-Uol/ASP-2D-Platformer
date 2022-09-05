// A class to handle the GUI for the Health system
// Draws the portrait, hearts, and decrements the display of the hearts

class HealthUI extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, totalHearts) {
        super(scene, x, y);
        this.bar = new Phaser.GameObjects.Graphics(scene);

        // Create UI parameters
        this.uiScale = 2;

        this.x = x / this.uiScale;
        this.y = y / this.uiScale;
        this.hearts = totalHearts;

        this.heartScale = .8;
    
        this.size = {
          width: 40,
          height: 8
        }

        this.filledHearts = [];
        this.emptyHearts = [];

        scene.add.existing(this.bar);
        // Draw the UI
        this.draw(this.x, this.y, this.uiScale, this.heartScale)
      }
    
      /** Decreases the amount of hearts by the amount that the player is damaged by.
       * Fades and shrinks the filled heart, and shows the heart outline behind it.
       * https://digitherium.com/blog/phaser-platformer-series-13-hearts-lives/ */
      decreaseHearts(amount) {

        const currentHeart = this.filledHearts[this.hearts - amount];
        const currentHeartOutline = this.emptyHearts[this.hearts - amount];
        this.hearts -= amount;

        //fade out the heart fill
        this.scene.tweens.add({
            targets: currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });

        //create a timeline of tweens for the heart outline so it shrinks then grows back
        const heartsTimeline = this.scene.tweens.createTimeline();

        //this is the heart outline scaling down
        heartsTimeline.add({
            targets: currentHeartOutline,
            scaleX: this.heartScale * 0.5,
            scaleY: this.heartScale * 0.5,
            ease: 'Power1',
            duration: 200
        });

        //and then back
        heartsTimeline.add({
            targets: currentHeartOutline,
            scaleX: this.heartScale * 1,
            scaleY: this.heartScale * 1,
            ease: 'Power1',
            duration: 200
        });
        
        //play the timeline straight away
        heartsTimeline.play();
      }

    /** Draw the portraits and the hearts */
    draw(x, y, uiScale, heartScale) {
        this.createPortrait(x, uiScale);
        this.createHearts(x, y, heartScale);
    }

    /** Add portrait to scene */
    createPortrait(x, scale) {
        this.scene.add.sprite(x + 320, 350, 'playerPortrait').setScale(scale).setScrollFactor(0);
    }

    /** Add two sets of heart sprites to scene. An empty heart and a full heart on top of each other.
     * For each heart, they do not scroll and are scaled appropriately. The number of hearts drawn is
     * dependent on initially how many hearts the player starts with, and is redrawn based on how many
     * hearts the player has after being damaged. */
    createHearts(x, y, scale) {

        const yOffset = 177.5;
        const xOffset = 290;
        const spacing = scale * 30;
        
        //create three heart fills...
        for (let i = 0; i < this.hearts; i++) {
            this.emptyHearts.push(this.scene.add.sprite(x + xOffset + (i * spacing), y + yOffset, 'emptyHeart'));
            this.filledHearts.push(this.scene.add.sprite(x + xOffset + (i * spacing), y + yOffset, 'filledHeart'));
        }

        this.filledHearts.forEach (filledHearts =>
            filledHearts
            .setScale(scale)
            .setScrollFactor(0,0)
            );
        this.emptyHearts.forEach (emptyHearts =>
            emptyHearts
            .setScale(scale)
            .setScrollFactor(0,0)
            );
    }
}

export default HealthUI; 