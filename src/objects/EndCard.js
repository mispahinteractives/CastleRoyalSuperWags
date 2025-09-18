import { Scene } from "phaser";
import { networkPlugin } from "../networkPlugin.js";
import { config } from "../config.js";

export class EndCard extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    init() {
        this.crackerIndex = 0;

        this.logo = this.scene.add.sprite(0, -220, 'sheet', 'Solitaire-CR_Logo').setOrigin(.5).setScale(1.3);
        this.add(this.logo);

        this.ray = this.scene.add.sprite(0, 170, 'sheet', 'VFX_God-Rays').setOrigin(.5).setScale(1);
        this.add(this.ray);

        this.ray1 = this.scene.add.sprite(0, 170, 'sheet', 'VFX_God-Rays').setOrigin(.5).setScale(1);
        this.add(this.ray1);

        this.text = this.scene.add.sprite(0, -20, 'sheet', 'SUPER CHEST UNLOCKED').setOrigin(.5).setScale(.7);
        this.add(this.text);

        this.chest = this.scene.add.sprite(0, 170, 'sheet', 'Super-Chest').setOrigin(.5).setScale(.65);
        this.add(this.chest);

        this.chest.setInteractive();
        this.chest.on("pointerdown", (event) => {
            this.onClick(this.chest);
        })

        this.handSprite = this.scene.add.sprite(0, 170, "sheet", 'Hand');
        this.handSprite.setScale(.8);
        this.handSprite.setOrigin(0, 0);
        this.add(this.handSprite);
        this.handSprite.visible = false;

        this.handTween = this.scene.add.tween({ targets: this.handSprite, scale: { from: this.handSprite.scaleX, to: this.handSprite.scaleX + .1 }, duration: 500, ease: "Linear", repeat: -1, yoyo: true, });


        this.visible = false;
    }

    showCrackers() {
        this.crackerEvent = this.scene.time.addEvent({
            delay: 550,
            callback: this.addCracker,
            callbackScope: this,
            loop: true
        });
    }

    stopCrackers() {
        if (this.crackerEvent) {
            this.crackerEvent.remove();
            this.crackerEvent = null;
        }
    }

    addCracker() {
        const frames = ["Fireworks_1", "Fireworks_3"];

        let xPos = [-250, -150, -50, 50, 150, 250];
        let yPos = [-200, -350, -300, -400, -300, -200];

        let index = this.crackerIndex % xPos.length;
        this.crackerIndex++;

        let cracker = this.scene.add.sprite(
            xPos[index],
            yPos[index],
            Phaser.Utils.Array.GetRandom(frames)
        );
        this.add(cracker);
        this.bringToTop(this.logo);

        cracker.setScale(0);
        cracker.setAlpha(0);

        this.scene.tweens.add({
            targets: cracker,
            scale: { from: 0, to: .85 },
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: "Sine.Out",
            onComplete: () => {
                this.scene.tweens.add({
                    targets: cracker,
                    alpha: 0,
                    duration: 100,
                    ease: "Linear",
                    onComplete: () => {
                        cracker.destroy();
                    }
                });
            }
        });

        // sparks logic 그대로
        for (let i = 0; i < 6; i++) {
            let spark = this.scene.add.sprite(
                cracker.x,
                cracker.y,
                Phaser.Utils.Array.GetRandom(frames)
            );
            this.add(spark);
            spark.setScale(0.3);
            spark.setAlpha(1);
            this.bringToTop(this.logo);

            let angle = Phaser.Math.DegToRad(i * 60 + Phaser.Math.Between(-15, 15));
            let distance = Phaser.Math.Between(130, 130);
            let targetX = cracker.x + Math.cos(angle) * distance;
            let targetY = cracker.y + Math.sin(angle) * distance;

            this.scene.tweens.add({
                targets: spark,
                x: targetX,
                y: targetY,
                scale: 0,
                duration: Phaser.Math.Between(1000, 1400),
                ease: "Sine.Out",
                onComplete: () => {
                    this.scene.tweens.add({
                        targets: spark,
                        alpha: 0,
                        duration: 100,
                        ease: "Linear",
                        onComplete: () => {
                            spark.destroy();
                        }
                    });
                }
            });
        }
    }

    onClick(sprite) {
        sprite.disableInteractive();
        networkPlugin.ctaPressed(config.googlePlayStoreLink, config.appleStoreLink);
    }

    show() {
        if (this.visible) return;
        this.visible = true;
        this.scene.hideUI();
        this.text.alpha = 0;
        this.chest.alpha = 0;
        this.logo.alpha = 0;
        this.ray.alpha = 0;
        this.ray1.alpha = 0;
        this.scene.sound.play('win', { volume: 1.5 })

        let delay = 0;
        this.scene.tweens.add({ targets: this.logo, alpha: 1, y: { from: this.logo.y - 400, to: this.logo.y }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.tweens.add({
            targets: this.text,
            alpha: 1,
            scaleX: { from: 0, to: this.text.scaleX },
            duration: 250,
            ease: "Back.easeOut",
            delay: delay,
            onComplete: () => {
                this.shakeTextSequence();
            }
        });

        delay += 250;
        this.scene.tweens.add({ targets: this.chest, alpha: 1, x: { from: this.chest.x - 400, to: this.chest.x }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.tweens.add({ targets: [this.ray, this.ray1], alpha: 1, scale: { from: 0, to: 1 }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.tweens.add({ targets: [this.ray, this.ray1], angle: 360, duration: 2000, ease: "Linear", delay: delay, repeat: -1 });

        setTimeout(() => {
            this.showCrackers();
            this.scene.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.handSprite.visible = true;
                },
            });
        }, delay);
    }

    shakeTextSequence() {
        const doShake = () => {
            this.scene.tweens.add({
                targets: this.text,
                x: this.text.x - 10,
                duration: 50,
                yoyo: true,
                repeat: 2,
                onComplete: () => {
                    this.scene.time.delayedCall(2000, () => {
                        doShake();
                    });
                }
            });
        };

        doShake();
    }

    adjust() {
        this.setScale(1)
        this.x = dimensions.gameWidth / 2;
        this.y = dimensions.gameHeight / 2;
    }
}