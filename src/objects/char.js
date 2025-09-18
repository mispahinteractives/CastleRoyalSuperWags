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
        this.circleFx = this.scene.add.sprite(0, 0, "card", "circular_electric_vfx/01");
        this.circleFx.setOrigin(.5);
        this.circleFx.setScale(2.5);
        this.add(this.circleFx);
        this.circleFx.visible = false;

        this.createAnimation('circular_electric_vfx/0', "card", 'circleFx', 1, 7, 0, false, 10, true);

        this.fx = this.scene.add.sprite(-250, 50, "sheet", "fx/01");
        this.fx.setOrigin(0, .5)
        this.fx.setScale(-1, 1);
        this.add(this.fx);

        this.fx.x += this.fx.width * 1.05;

        this.createAnimation('fx/0', "sheet", 'fx', 1, 6, 0, false, 5);

        this.char = this.scene.add.sprite(0, 0, 'sheet', 'Super-wags').setOrigin(.5).setScale(.85);
        this.add(this.char);

    }

    createAnimation(path, prefix, animString, frameStart, frameEnd, repeat, hideOnComplete, frameRate, reverse = false) {
        let frames = this.scene.anims.generateFrameNames(prefix, {
            prefix: path,
            start: frameStart,
            end: frameEnd,
        });

        if (reverse) {
            frames = frames.reverse();
        }

        this.scene.anims.create({
            key: animString,
            frames: frames,
            frameRate: frameRate,
            repeat: repeat,
            hideOnComplete: hideOnComplete,
        });
    }



}