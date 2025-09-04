export class Char extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    init() {

        this.char = this.scene.add.sprite(0, 0, 'sheet', 'Super-wags').setOrigin(.5).setScale(.85);
        this.add(this.char);

        this.fx = this.scene.add.sprite(-350, 50, "sheet", "fx/01");
        this.fx.setOrigin(.5)
        this.fx.setScale(1);
        this.add(this.fx);

        this.createAnimation('fx/0', "sheet", 'fx', 1, 6, 0, true, 5);
    }

    createAnimation(path, prefix, animString, frameStart, frameEnd, repeat, hideOnComplete, frameRate) {
        this.scene.anims.create({
            key: animString,
            frames: this.scene.anims.generateFrameNames(prefix, {
                prefix: path,
                start: frameStart,
                end: frameEnd,
            }),
            frameRate: frameRate,
            repeat: repeat,
            hideOnComplete: hideOnComplete,
        });
    }

}