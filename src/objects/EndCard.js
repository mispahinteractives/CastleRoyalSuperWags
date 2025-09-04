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
        this.logo = this.scene.add.sprite(0, -200, 'sheet', 'Solitaire-CR_Logo').setOrigin(.5).setScale(1);
        this.add(this.logo);

        this.ray = this.scene.add.sprite(0, 170, 'sheet', 'VFX_God-Rays').setOrigin(.5).setScale(1);
        this.add(this.ray);

        this.text = this.scene.add.sprite(0, 0, 'sheet', 'SUPER CHEST UNLOCKED').setOrigin(.5).setScale(.65);
        this.add(this.text);

        this.chest = this.scene.add.sprite(0, 170, 'sheet', 'Super-Chest').setOrigin(.5).setScale(.65);
        this.add(this.chest);

        this.visible = false;
    }

    showCrackers() {
        this.crackerEvent = this.scene.time.addEvent({
            delay: 350,
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
        let cracker = this.scene.add.sprite(Phaser.Math.Between(-300, 100), Phaser.Math.Between(-400, -100), "Fireworks_" + Phaser.Math.Between(1, 3))
        this.add(cracker);
        this.bringToTop(this.banner);
        this.scene.add.tween({
            targets: cracker,
            scale: { from: 0, to: .8 },
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                cracker.destroy();
            }
        })
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
                this.scene.tweens.add({ targets: this.text, scale: this.text.scaleX - .05, duration: 250, ease: "Linear", delay: 1000, repeat: -1, yoyo: true });
            }
        });

        delay += 250;
        this.scene.tweens.add({ targets: this.chest, alpha: 1, x: { from: this.chest.x - 400, to: this.chest.x }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.tweens.add({ targets: this.ray, alpha: 1, scale: { from: 0, to: 1 }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.scene.tweens.add({ targets: this.ray, angle: 360, duration: 2000, ease: "Linear", delay: delay, repeat: -1 });

        setTimeout(() => {
            this.showCrackers();
        }, delay);
    }

    adjust() {
        this.setScale(1)
        this.x = dimensions.gameWidth / 2;
        this.y = dimensions.gameHeight / 2;
    }
}