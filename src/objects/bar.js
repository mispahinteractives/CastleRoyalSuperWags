export class Bar extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    init() {
        this.sparkleGrp = this.scene.add.container();
        this.add(this.sparkleGrp);

        this.currentLevel = 0;
        this.ring = this.scene.add.sprite(0, 0, "sheet", "VFX_Ring").setScale(1.3)
        this.add(this.ring);
        this.ring.visible = false;
        this.ring.scaleValue = this.ring.scaleX;

        this.ray = this.scene.add.sprite(0, 0, "sheet", "VFX_God-Rays").setScale(1.3)
        this.add(this.ray);
        this.ray.visible = false;

        this.fx = this.scene.add.sprite(0, 0, "card", "circular_electric_vfx/01");
        this.fx.setOrigin(.5);
        this.fx.setScale(2.5);
        this.add(this.fx);
        this.fx.visible = false;

        this.createAnimation('circular_electric_vfx/0', "card", 'circular_electric_vfx', 1, 7, 0, false, 10);

        this.bg = this.scene.add.sprite(0, 0, "sheet", "Blue_Circle").setScale(1);
        this.add(this.bg);

        this.charGrp = this.scene.add.container(0, 0);
        this.add(this.charGrp);

        this.char = this.scene.add.sprite(30, 207, "sheet", "Wags1").setScale(1).setOrigin(.5, 1)
        this.charGrp.add(this.char);

        this.charMask = this.scene.add.sprite(122, -80, "sheet", "Mask").setScale(1).setOrigin(1, .5)
        this.charGrp.add(this.charMask);
        this.charMask.alpha = 0;

        this.changeFrame1();

        this.cape = this.scene.add.sprite(55, -12, "sheet", "Cape").setScale(1);
        this.add(this.cape);
        this.cape.alpha = 0;

        this.bgFill = this.scene.add.sprite(-80, 70, "card", "Prograss-Bar-BG");
        this.add(this.bgFill);

        this.fill1 = this.scene.add.sprite(10, 137, "card", "Prograss-Bar-Fill_01").setOrigin(1, .5).setVisible(false);
        this.fill2 = this.scene.add.sprite(10, 107, "card", "Prograss-Bar-Fill_02").setOrigin(1, .5).setVisible(false);
        this.fill3 = this.scene.add.sprite(12, 69, "card", "Prograss-Bar-Fill_03").setOrigin(1, .5).setVisible(false);

        this.add([this.fill1, this.fill2, this.fill3]);

        this.xPos = [51, -23, -66, -72];
        this.yPos = [78, 26.95, -54, -122]

        this.circle = this.scene.add.sprite(this.bgFill.x - 70, this.bgFill.y - 110, "sheet", "bolt back circle_").setScale(1);
        this.add(this.circle);

        this.boltFx = this.scene.add.sprite(this.circle.x, this.circle.y, "sheet", "electric effect").setScale(1)
        this.add(this.boltFx);
        this.boltFx.visible = false;

        this.circleFx = this.scene.add.sprite(this.circle.x, this.circle.y, "card", "circular_electric_vfx/01");
        this.circleFx.setOrigin(.5);
        this.circleFx.setScale(1);
        this.add(this.circleFx);
        this.circleFx.visible = false;

        this.rectFx = this.scene.add.sprite(this.circle.x, this.circle.y, "card", "super_text_vfx/01");
        this.rectFx.setOrigin(.5);
        this.rectFx.setScale(1);
        this.add(this.rectFx);
        this.rectFx.visible = false;

        this.createAnimation('super_text_vfx/0', "card", 'super_text_vfx', 1, 8, 0, false, 15);

        this.visible = false;
    }

    showFx(isfinalCard = false) {
        if (this.circleFx.visible) return;

        if (isfinalCard) {
            this.scene.tweens.add({
                targets: this.circleFx,
                scale: 5,
                duration: 200,
                ease: 'Linear',
                onComplete: () => {
                    if (isfinalCard) {
                        this.scene.gamePlay.showWin();
                    }
                }
            })
        }
        this.circleFx.alpha = 1;
        this.circleFx.visible = true;
        this.circleFx.anims.play("circular_electric_vfx");
        this.circleFx.on('animationcomplete', () => {


            this.scene.tweens.add({
                targets: this.circleFx,
                alpha: 0,
                duration: 200,
                ease: 'Linear',
                onComplete: () => {
                    this.circleFx.visible = false;
                }
            });
        });
    }

    showRectFx() {
        if (this.rectFx.visible) return;
        this.rectFx.alpha = 1;
        this.rectFx.visible = true;
        this.rectFx.anims.play("super_text_vfx");
        this.rectFx.on('animationcomplete', () => {
            this.scene.tweens.add({
                targets: this.rectFx,
                alpha: 0,
                duration: 200,
                ease: 'Linear',
                onComplete: () => {
                    this.rectFx.visible = false;
                }
            });
        });
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

    addSparkle() {
        let centerX = 0;
        let centerY = 0;

        let emitter = this.scene.add.particles(0, 0, 'sheet', {
            frame: ['Particle-Dot'],
            x: centerX,
            y: centerY,
            speed: { min: 100, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 5000,
            quantity: 250,
            on: false
        });

        emitter.explode(250, centerX, centerY);
        this.sparkleGrp.add(emitter);
    }

    show() {
        if (this.visible) return;
        this.visible = true;
        this.adjust();
        this.y = dimensions.gameHeight / 2 - 100;

        this.addSparkle();
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            onComplete: () => {
                this.fx.visible = true;
                this.fx.anims.play("circular_electric_vfx");
                this.fx.on('animationcomplete', () => {
                    this.scene.tweens.add({
                        targets: this.fx,
                        alpha: 0,
                        duration: 200,
                        ease: 'Linear',
                    });
                });

                this.ring.visible = true;
                this.ring.tween = this.scene.tweens.add({
                    targets: this.ring,
                    scale: { from: this.ring.scaleX, to: this.ring.scaleX + 0.2 },
                    duration: 800,
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });
                this.ray.visible = true;
                this.scene.tweens.add({
                    targets: this.ray,
                    scale: { from: 0, to: this.ray.scaleX },
                    duration: 250,
                    ease: "Back.easeOut",
                    onComplete: () => {
                        this.ray.tween = this.scene.tweens.add({ targets: this.ray, angle: 360, duration: 2000, ease: "Linear", repeat: -1 });
                    }
                });
            }
        });

        this.scene.tweens.add({
            targets: this,
            scale: { from: this.scale * 2.5, to: this.scale },
            duration: 500,
            ease: 'Back.easeOut',
            onComplete: () => {

                this.scene.tweens.add({
                    targets: this,
                    y: { from: this.y, to: this.y + 100 },
                    duration: 250,
                    ease: 'Linear',
                    delay: 500,
                    onComplete: () => {
                        this.scene.time.addEvent({
                            delay: 250,
                            callback: () => {
                                this.scene.intro.show();
                            }
                        })
                    }
                });
            }
        })
    }

    hide() {
        if (!this.visible) return;
        this.scene.tweens.add({
            targets: this,
            alpha: { from: 1, to: 0 },
            duration: 250,
            ease: 'Cubic.Out',
            onComplete: () => {
                this.visible = false;
            }
        });
    }

    moveBarToTop() {
        this.barMoving = true;
        if (this.ring.tween) {
            this.ring.tween.stop();
            this.ring.tween = null;
        }
        if (this.ray.tween) {
            this.ray.tween.stop();
            this.ray.tween = null;
        }

        this.scene.tweens.add({
            targets: this.ring,
            scale: { from: this.ring.scaleX, to: this.ring.scaleValue },
            duration: 300,
            ease: 'Linear',
        });

        this.scene.tweens.add({
            targets: this.ray,
            alpha: 0,
            duration: 300,
            ease: 'Linear',
        });
        this.scene.tweens.add({
            targets: this,
            y: dimensions.gameHeight / 2 - 280,
            scale: .74,
            duration: 250,
            ease: "Cubic.Out",
            delay: 300,
            onComplete: () => {
                this.ray.visible = false;
                this.scene.gamePlay.show();
            }
        });
    }

    changeFrame1() {
        if (this.state == "Wags1") return;
        this.state = "Wags1";

        this.removeEyelidLoop();

        this.char.setFrame("Wags1");

        this.eyelidLoop();
    }

    changeFrame2() {
        if (this.state == "Wags2") return;
        this.state = "Wags2";

        this.removeEyelidLoop();

        this.char.setFrame("Wags2");
        this.scene.tweens.add({ targets: this.char, scale: { from: this.char.scale, to: this.char.scale + .025 }, duration: 200, ease: "Linear" });
        this.scene.tweens.add({
            targets: this.charMask,
            alpha: { from: 0, to: 1 },
            scaleX: { from: 0, to: this.charMask.scaleX },
            duration: 300,
            ease: "Back.easeOut",
            onComplete: () => {
                this.char.setFrame("Wags2");

                this.eyelidLoop();

            }
        });
    }

    changeFrame3() {
        if (this.state == "Wags3") return;
        this.state = "Wags3";

        this.removeEyelidLoop();

        this.char.setFrame("Wags3");
        this.scene.tweens.add({ targets: this.charGrp, scale: { from: this.charGrp.scale, to: this.charGrp.scale + .025 }, duration: 200, ease: "Linear", yoyo: true });
        this.scene.tweens.add({ targets: this.cape, alpha: { from: 0, to: 1 }, scale: { from: this.cape.scale * 1.5, to: this.cape.scale }, x: { from: this.cape.x + 25, to: this.cape.x }, duration: 300, ease: "Back.easeOut" });
        this.char.setFrame("Wags3");
        this.eyelidLoop();

    }

    eyelidLoop() {
        this.removeEyelidLoop();
        this.charLoop = this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.smoothSetFrame(this.char, this.state + "_close");
                this.charLoop1 = this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.smoothSetFrame(this.char, this.state);

                    }
                });
            }
        });
    }

    smoothSetFrame(sprite, newFrame) {
        let temp = this.scene.add.sprite(sprite.x, sprite.y, sprite.texture.key, newFrame)
            .setAlpha(0)
            .setDepth(sprite.depth + 1);
        temp.setOrigin(sprite.originX, sprite.originY);
        temp.setScale(sprite.scale);
        this.charGrp.add(temp);
        this.charGrp.bringToTop(this.charMask);

        this.scene.tweens.add({
            targets: temp,
            alpha: 1,
            duration: 200,
            onComplete: () => {
                sprite.setFrame(newFrame);
                temp.destroy();
            }
        });
    }

    removeEyelidLoop() {
        if (this.charLoop) this.scene.time.removeEvent(this.charLoop), this.charLoop = null;
        if (this.charLoop1) this.scene.time.removeEvent(this.charLoop), this.charLoop1 = null;

    }

    increaseBar() {
        if (this.currentLevel >= 3) return;

        this.currentLevel++;

        let targetFill = null;
        if (this.currentLevel === 1) {
            targetFill = this.fill1;
            this.changeFrame2();
        }
        if (this.currentLevel === 2) {
            targetFill = this.fill2;
            this.changeFrame3();
        }
        if (this.currentLevel === 3) targetFill = this.fill3;
        this.showRectFx();
        if (targetFill) {
            targetFill.setVisible(true);
            targetFill.setAlpha(0);
            this.boltFx.visible = true;
            this.scene.tweens.add({ targets: this.boltFx, scale: { from: 1, to: 1.3 }, alpha: { from: 0.3, to: 1 }, ease: "Expo.easeOut", duration: 80, yoyo: true, repeat: 2, repeatDelay: Phaser.Math.Between(50, 200) });
            this.scene.tweens.add({ targets: this.boltFx, alpha: { from: 0, to: 1 }, duration: 50, yoyo: true, repeat: 2, repeatDelay: Phaser.Math.Between(100, 400) })
            this.scene.tweens.add({
                targets: this.boltFx,
                angle: { from: -2, to: 2 },
                ease: "Quad.easeInOut",
                duration: 60,
                yoyo: true,
                repeat: 2,
                onComplete: () => {
                    this.boltFx.visible = false;
                }
            });
            this.ray.visible = true;
            this.ray.alpha = 1;
            this.scene.tweens.add({
                targets: this.ray,
                angle: 100,
                duration: 1000,
                ease: "Linear",
                onComplete: () => {
                    this.scene.tweens.add({ targets: this.ray, alpha: 0, duration: 200, ease: "Linear" });
                }
            });
            this.scene.tweens.add({ targets: this.ring, scale: { from: this.ring.scale, to: this.ring.scale + .1 }, duration: 500, ease: "Linear", yoyo: true });
            this.scene.tweens.add({ targets: this.circle, scale: { from: this.circle.scale, to: this.circle.scale - .25 }, duration: 200, ease: "Linear", yoyo: true });
            this.scene.tweens.add({
                targets: targetFill,
                alpha: { from: 0, to: 1 },
                duration: 300,
                ease: "Back.Out",
                onComplete: () => {
                    if (this.currentLevel == 3)
                        this.showFx(true);

                }
            });
        }
    }

    resetBar() {
        this.currentLevel = 0;
        this.fill1.setVisible(false);
        this.fill2.setVisible(false);
        this.fill3.setVisible(false);
    }

    adjust() {
        if (dimensions.isPortrait) {
            this.setScale(1)
            this.x = dimensions.gameWidth / 2;
            this.y = dimensions.gameHeight / 2;

            if (this.barMoving) {
                this.y = dimensions.gameHeight / 2 - 280;
                this.setScale(.74);
            }
        } else {
            this.setScale(1)
            this.x = dimensions.gameWidth / 2;
            this.y = dimensions.gameHeight / 2;

            if (this.barMoving) {
                this.y = dimensions.gameHeight / 2 - 280;
                this.setScale(.74);
            }
        }
    }
}