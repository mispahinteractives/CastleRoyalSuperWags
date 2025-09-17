export class Intro extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    init() {

        let path = ['Collect-C', 'Collect-O', 'Collect-L', 'Collect-L', 'Collect-E', 'Collect-C', 'Collect-T', 'Text_3'];
        let startX = -180;
        this.textArr = [];

        for (let i = 0; i < path.length; i++) {
            let text = this.scene.add.sprite(startX, -290, "sheet", path[i]);
            text.setScale(1)
            this.add(text);
            this.textArr.push(text);

            if (path[i] == "Collect-T") {
                startX += 55;
            } else {
                startX += 40;
            }
        }

        this.boltFx = this.scene.add.sprite(180, -290, "card", "super_text_vfx/01").setScale(1)
        this.add(this.boltFx);
        this.createAnimation('super_text_vfx/0', "card", 'super_text_vfx2', 1, 8, 0, false, 15);

        this.bolt = this.scene.add.sprite(180, -290, "sheet", "Bolt Icon").setScale(1.3)
        this.add(this.bolt);

        let line1 = ["_zap_", "Text_and", "Text_wags", "Text_Will"];
        let line2 = ["Text_ZAP_", "Text_the", "Text_level!"];
        let line1Blur = ["", "", ""];
        let line2Blur = ["Zap-blur", "", ""];

        this.introArr = [];

        let line1X = [-240, -160, 0, 170];
        let lineY1 = 280;

        for (let i = 0; i < line1.length; i++) {
            let text = this.scene.add.sprite(line1X[i] + 5, lineY1, "sheet", "intro/" + line1[i]);
            text.setScale(1);
            this.add(text);
            this.introArr.push(text);

            text.normal = line1[i];
            text.blur = line1Blur[i];
            if (i == 0) {
                text.setScale(3);
            }
        }

        let line2X = [-150, -10, 160];
        let lineY2 = 360;

        for (let i = 0; i < line2.length; i++) {
            let text = this.scene.add.sprite(line2X[i] - 20, lineY2, "sheet", "intro/" + line2[i]);
            text.setScale(1);
            this.add(text);

            text.normal = line2[i];
            text.blur = line2Blur[i];
            this.introArr.push(text);
        }



        this.visible = false;
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

    show() {
        if (this.visible) return;
        this.visible = true;

        this.textArr.forEach(element => {
            element.alpha = 0;;
        });
        this.introArr.forEach(element => {
            element.alpha = 0;;
        });
        this.bolt.alpha = 0;;
        this.boltFx.visible = false;

        let delay = 0;

        this.textArr.forEach((item, i) => {
            this.scene.tweens.add({ targets: [item], alpha: 1, x: { from: item.x - 20, to: item.x }, duration: 250, ease: "Back.easeOut", delay: delay + (i * 50), });
        });

        delay += (this.textArr.length * 50);
        this.scene.tweens.add({ targets: this.bolt, alpha: 1, x: { from: this.bolt.x - 20, to: this.bolt.x }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.boltFx.visible = true;
                this.boltFx.anims.play("super_text_vfx2");
                this.boltFx.on('animationcomplete', () => {
                    this.scene.tweens.add({
                        targets: this.boltFx,
                        alpha: 0,
                        duration: 200,
                        ease: 'Linear',
                        onComplete: () => {
                            this.boltFx.visible = false;
                        }
                    });
                });
            }
        })

        delay += 250;
        // this.scene.time.addEvent({
        //     delay: delay,
        //     callback: () => {
        //         this.scene.bar.show();
        //     }
        // })

        delay += 250;
        this.introArr.forEach((item, i) => {
            this.scene.tweens.add({
                targets: [item],
                alpha: 1,
                x: { from: item.x - 20, to: item.x },
                duration: 250,
                ease: "Back.easeOut",
                delay: delay + (i * 50),
                onComplete: () => {

                    if (item.blur) {
                        this.scene.tweens.add({
                            targets: [item],
                            x: { from: item.x - 20, to: item.x },
                            duration: 250,
                            ease: "Linear",
                            onComplete: () => {
                                item.setFrame("intro/" + item.normal);
                            }
                        });
                        item.setFrame("intro/" + item.blur);
                    }
                }
            })
        });

        delay += (this.introArr.length * 50);

        delay += 2000;
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.hide();
            }
        })

    }

    hide() {
        let xPos = (this.scene.bar.circle.x * this.scene.bar.scale + this.scene.bar.x - this.x) / this.scale;
        let yPos = (this.scene.bar.circle.y * this.scene.bar.scale + this.scene.bar.y - this.y) / this.scale;
        this.boltFx.visible = false;

        this.scene.tweens.add({
            targets: [this.bolt],
            x: [this.bolt.x, this.bolt.x - 250, xPos],
            y: [this.bolt.y, this.bolt.y - 200, yPos],
            interpolation: 'bezier',
            duration: 250,
            ease: "Linear",
            onComplete: () => {
                this.scene.bar.showFx();
            }
        })
        this.scene.add.tween({
            targets: [this.text, ...this.textArr, ...this.introArr],
            alpha: 0,
            duration: 300,
            ease: 'Linear',
            onComplete: () => {
                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.visible = false;
                        this.scene.bar.moveBarToTop();
                    }
                })
            }
        })
    }

    adjust() {
        if (dimensions.isPortrait) {
            this.setScale(1)
            this.x = dimensions.gameWidth / 2;
            this.y = dimensions.gameHeight / 2;

        } else {

            this.setScale(1)
            this.x = dimensions.gameWidth / 2;
            this.y = dimensions.gameHeight / 2 - 40;

        }
    }
}