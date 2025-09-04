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
        this.currentLevel = 0;

        this.bg = this.scene.add.sprite(0, 0, "sheet", "Blue_Circle").setScale(1);
        this.add(this.bg);

        this.char = this.scene.add.sprite(30, -7, "sheet", "Wags1").setScale(1);
        this.add(this.char);

        this.bgFill = this.scene.add.sprite(-80, 70, "sheet", "Prograss-Bar-BG");
        this.add(this.bgFill);

        this.fill1 = this.scene.add.sprite(10, 137, "sheet", "Prograss-Bar-Fill_01").setOrigin(1, .5).setVisible(false);
        this.fill2 = this.scene.add.sprite(10, 107, "sheet", "Prograss-Bar-Fill_02").setOrigin(1, .5).setVisible(false);
        this.fill3 = this.scene.add.sprite(12, 69, "sheet", "Prograss-Bar-Fill_03").setOrigin(1, .5).setVisible(false);

        this.add([this.fill1, this.fill2, this.fill3]);

        this.xPos = [51, -23, -66, -72];
        this.yPos = [78, 26.95, -54, -122]

        this.circle = this.scene.add.sprite(this.bgFill.x + 51, this.bgFill.y + 78, "sheet", "bolt back circle_").setScale(1);
        this.add(this.circle);

        this.visible = false;
    }

    show() {
        if (this.visible) return;
        this.visible = true;

        this.scene.tweens.add({
            targets: this,
            scale: { from: 0, to: 1 },
            duration: 250,
            ease: 'Sine.easeOut'
        });
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
        this.scene.tweens.add({
            targets: this,
            y: dimensions.gameHeight / 2 - 280,
            scale: .74,
            duration: 250,
            ease: "Cubic.Out",
            delay: 300,
            onComplete: () => {
                this.scene.gamePlay.show();
            }
        });
    }

    increaseBar() {
        if (this.currentLevel >= 3) return;

        this.currentLevel++;

        let targetFill = null;
        if (this.currentLevel === 1) targetFill = this.fill1;
        if (this.currentLevel === 2) targetFill = this.fill2;
        if (this.currentLevel === 3) targetFill = this.fill3;

        if (targetFill) {
            targetFill.setVisible(true);
            targetFill.setAlpha(0);

            this.scene.tweens.add({ targets: this.circle, x: this.bgFill.x + this.xPos[this.currentLevel], y: this.bgFill.y + this.yPos[this.currentLevel], duration: 400, ease: "Cubic.Out" });
            this.scene.tweens.add({ targets: targetFill, alpha: { from: 0, to: 1 }, duration: 400, ease: "Back.Out" });
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
            }
        } else {
            this.setScale(1)
            this.x = dimensions.gameWidth / 2;
            this.y = dimensions.gameHeight / 2;
        }
    }
}