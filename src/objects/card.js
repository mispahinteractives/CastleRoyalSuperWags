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

        this.card = this.scene.add.sprite(0, 0, 'sheet', 'Back_Card_').setOrigin(.5);
        this.add(this.card);

        this.bolt = this.scene.add.sprite(24, -35, 'sheet', 'Bolt Icon').setOrigin(.5).setScale(.5)
        this.add(this.bolt);
        this.bolt.visible = false;

    }

}