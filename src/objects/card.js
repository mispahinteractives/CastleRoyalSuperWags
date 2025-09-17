export class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    init() {

        this.card = this.scene.add.sprite(0, 0, 'card', 'Back_Card_').setOrigin(.5);
        this.add(this.card);

        this.bolt = this.scene.add.sprite(24, -35, 'sheet', 'Bolt Icon').setOrigin(.5).setScale(.5)
        this.add(this.bolt);
        this.bolt.visible = false;

    }

    shakeSprite() {
        let prevAngle = this.angle;
        this.scene.tweens.add({
            targets: this,
            angle: this.angle - 10,
            duration: 80,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.setAngle(prevAngle);
                this.parentContainer.canClick = true;
                this.parentContainer.showHint();
            }
        });
    }

}