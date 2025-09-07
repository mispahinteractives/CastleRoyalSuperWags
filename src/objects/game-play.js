import { Card } from "./card";
import { Char } from "./char";

export class GamePlay extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);

        this.init();
    }

    show() {
        if (this.visible) return;
        this.visible = true;
        this.bg.alpha = 0;
        this.base.alpha = 0;

        this.topCards.forEach(card => {
            card.alpha = 0;
        })

        this.bottomCards.forEach(card => {
            card.alpha = 0;
        })

        this.targetCards.forEach(card => {
            card.alpha = 0;
        })

        let delay = 0;
        this.scene.tweens.add({ targets: this.bg, alpha: 1, x: { from: this.bg.x - 20, to: this.bg.x }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.topCards.forEach((item, i) => {
            this.scene.tweens.add({ targets: [item], alpha: 1, scale: { from: 2, to: item.scaleX }, duration: 250, ease: "Back.easeOut", delay: delay + (i * 50), });
        });

        delay += (this.topCards.length * 50);
        this.scene.tweens.add({ targets: this.base, alpha: 1, scaleX: { from: 0, to: this.base.scaleX }, duration: 250, ease: "Back.easeOut", delay: delay, });

        delay += 250;
        this.bottomCards.forEach((item, i) => {
            this.scene.tweens.add({ targets: [item], alpha: 1, x: { from: item.x - 20, to: item.x }, duration: 250, ease: "Back.easeOut", delay: delay + (i * 50), });
        });

        delay += (this.bottomCards.length * 50);
        this.targetCards.forEach((item, i) => {
            this.scene.tweens.add({ targets: [item], alpha: 1, x: { from: item.x - 20, to: item.x }, duration: 250, ease: "Back.easeOut", delay: delay + (i * 50), });
        });

        delay += (this.targetCards.length * 50);
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.canClick = true;
                this.showHint();
                // this.showWin();
            }
        })
    }

    hide() {
        this.scene.add.tween({
            targets: this,
            alpha: 0,
            duration: 250,
            ease: 'Linear',
            onComplete: () => {
                this.visible = false;
            }
        })
    }

    init() {
        this.cardScale = .912;
        this.hintTimer = 3000;

        this.cardPlayOrder = ['Diamonds-A', "Diamonds-2", "Diamonds-3", 'Diamonds-4', 'Diamonds-5', 'Diamonds-6', 'Diamonds-7', 'Diamonds-8',
            'Diamonds-9', 'Diamonds-10', 'Diamonds-J', 'Diamonds-Q', 'Diamonds-K'
        ];

        this.cardDependencies = {
            "Diamonds-2": ["Diamonds-Q"],
            "Diamonds-3": ["Diamonds-4", "Diamonds-9", "Diamonds-J"],
            "Diamonds-5": ["Diamonds-6"],
            "Diamonds-7": ["Diamonds-8"],
            "Diamonds-8": ["Diamonds-10"],
        };

        this.currentIndex = 0;
        this.boltCount = 0;

        this.bg = this.scene.add.sprite(0, 0, 'sheet', 'Level-BG').setOrigin(.5);
        this.add(this.bg);

        this.base = this.scene.add.sprite(0, 170, 'sheet', 'Talon-Base').setOrigin(.5);
        this.add(this.base);

        let targetData = [
            { front: "Diamonds-A", back: "Back_Card_", x: 70, y: 160, isFlipped: true },
        ];

        this.targetCards = [];

        targetData.forEach(card => {
            let newCard = new Card(this.scene, 0, 0);
            newCard.x = card.x;
            newCard.y = card.y;
            newCard.setScale(this.cardScale);
            newCard.data = { front: card.front, back: card.back, x: card.x, y: card.y, angle: card.angle, isFlipped: card.isFlipped };
            this.add(newCard);
            this.targetCards.push(newCard);

            if (newCard.data.isFlipped) {
                newCard.card.setFrame(newCard.data.front);
            } else {
                newCard.card.setFrame(newCard.data.back);
            }
        });

        let cardDataBottom = [
            { front: "Diamonds-K", back: "Back_Card_", x: -60, y: 160, isFlipped: false },
            { front: "Diamonds-K", back: "Back_Card_", x: -45, y: 160, isFlipped: false },
            { front: "Diamonds-K", back: "Back_Card_", x: -30, y: 160, isFlipped: false },
            { front: "Diamonds-K", back: "Back_Card_", x: -15, y: 160, isFlipped: false },
        ];

        this.bottomCards = [];

        cardDataBottom.forEach(card => {
            let newCard = new Card(this.scene, 0, 0);
            newCard.x = card.x;
            newCard.y = card.y;
            newCard.setScale(this.cardScale);
            newCard.data = { front: card.front, back: card.back, x: card.x, y: card.y, angle: card.angle, isFlipped: card.isFlipped };
            this.add(newCard);
            this.bottomCards.push(newCard);

            if (newCard.data.isFlipped) {
                newCard.card.setFrame(newCard.data.front);
            } else {
                newCard.card.setFrame(newCard.data.back);
            }
        });

        let cardDataTop = [
            { front: "Diamonds-K", back: "Back_Card_", x: -45, y: -86, angle: 0, isFlipped: false, isBolt: false },
            { front: "Diamonds-K", back: "Back_Card_", x: 45, y: -86, angle: 0, isFlipped: false, isBolt: false },
            { front: "Diamonds-K", back: "Back_Card_", x: -68, y: -18, angle: 135, isFlipped: false, isBolt: false },
            { front: "Diamonds-J", back: "Back_Card_", x: -70, y: -40, angle: 45, isFlipped: false, isBolt: false },
            { front: "Diamonds-6", back: "Back_Card_", x: -11, y: 38, angle: -45, isFlipped: false, isBolt: true },
            { front: "Diamonds-K", back: "Back_Card_", x: 68, y: -18, angle: -135, isFlipped: false, isBolt: false },
            { front: "Diamonds-9", back: "Back_Card_", x: 70, y: -40, angle: -45, isFlipped: false, isBolt: false },
            { front: "Diamonds-K", back: "Back_Card_", x: -70.5, y: -151, angle: 90, isFlipped: false, isBolt: false },
            { front: "Diamonds-Q", back: "Back_Card_", x: -132, y: -130, angle: 45, isFlipped: false, isBolt: false },
            { front: "Diamonds-2", back: "Back_Card_", x: -148, y: -95, angle: -45, isFlipped: true, isBolt: false },
            { front: "Diamonds-10", back: "Back_Card_", x: 70.5, y: -151, angle: -90, isFlipped: false, isBolt: false },
            { front: "Diamonds-8", back: "Back_Card_", x: 132, y: -130, angle: -45, isFlipped: false, isBolt: true },
            { front: "Diamonds-7", back: "Back_Card_", x: 148, y: -95, angle: 45, isFlipped: true, isBolt: false },
            { front: "Diamonds-4", back: "Back_Card_", x: 0, y: -151, angle: -90, isFlipped: false, isBolt: false },
            { front: "Diamonds-3", back: "Back_Card_", x: 0, y: -86, angle: 0, isFlipped: true, isBolt: true },
            { front: "Diamonds-5", back: "Back_Card_", x: 11, y: 38, angle: 45, isFlipped: true, isBolt: false },
        ];

        this.topCards = [];

        cardDataTop.forEach(card => {
            let newCard = new Card(this.scene, 0, 0);
            newCard.x = card.x;
            newCard.y = card.y;
            newCard.setScale(this.cardScale);
            newCard.angle = card.angle;
            newCard.data = { front: card.front, back: card.back, x: card.x, y: card.y, angle: card.angle, isFlipped: card.isFlipped, isBolt: card.isBolt };
            this.add(newCard);
            this.topCards.push(newCard);

            if (newCard.data.isFlipped) {
                newCard.card.setFrame(newCard.data.front);
                if (newCard.data.isBolt) {
                    newCard.bolt.visible = true;
                }
            } else {
                newCard.card.setFrame(newCard.data.back);
            }

            newCard.card.setInteractive({ useHandCursor: true });

            newCard.card.on('pointerdown', () => {
                this.topClick(newCard);
            });
        });

        this.superWag = new Char(this.scene, 0, 0)
        this.add(this.superWag);
        this.superWag.x = -300;
        this.superWag.y = -100;
        this.superWag.visible = false;

        this.handSprite = this.scene.add.sprite(0, 0, "sheet", 'Hand');
        this.handSprite.setScale(.8);
        this.handSprite.setOrigin(0, 0);
        this.add(this.handSprite);
        this.handSprite.visible = false;

        this.visible = false;
    }

    topClick(sprite) {
        if (!this.canClick) return;
        if (this.gameOver) return;
        if (!sprite.data.isFlipped) return;
        this.stopHint();
        this.scene.sound.play('click', { volume: 1.5 })
        const expected = this.cardPlayOrder[this.currentIndex + 1];
        if (expected === sprite.data.front && !sprite.placed) {
            sprite.disableInteractive();
            this.bringToTop(sprite);
            sprite.placed = true;

            if (sprite.data.isBolt) {
                sprite.bolt.visible = false;
                this.scene.addCard(sprite)
                this.boltCount++;
                if (this.boltCount >= 3) {
                    this.scene.sound.play('positive3', { volume: 1 });
                    this.showWin();
                } else if (this.boltCount === 2) {
                    this.scene.sound.play('positive2', { volume: 1 });
                } else if (this.boltCount === 1) {
                    this.scene.sound.play('positive1', { volume: 1 });
                }
            }
            const target = this.targetCards[this.targetCards.length - 1];
            this.moveCardWithArc(sprite, target.x, target.y);

            this.targetCards.push(sprite);
            this.topCards = this.topCards.filter(card => card !== sprite);

            this.currentIndex++;

            const cardName = expected;
            const deps = this.cardDependencies[cardName];
            if (deps) {
                deps.forEach(dep => {
                    const card = this.topCards.find(c => c.data.front === dep);
                    if (card && !card.data.isFlipped) {
                        this.flipCard(card);
                    }
                });
            }
        } else {
            sprite.shakeSprite();
        }
    }

    flipCard(card) {
        this.scene.tweens.add({
            targets: card,
            scaleX: 0,
            duration: 150,
            ease: 'Linear',
            onComplete: () => {
                card.card.setFrame(card.data.front);
                card.data.isFlipped = true;
                if (card.data.isFlipped && card.data.isBolt) {
                    card.bolt.visible = true;
                }
                this.scene.tweens.add({
                    targets: card,
                    scaleX: this.cardScale,
                    duration: 150,
                    ease: 'Linear'
                });
            }
        });
    }

    moveCardWithArc(sprite, targetX, targetY, onComplete) {
        let startX = sprite.x;
        let startY = sprite.y;

        const dx = targetX - startX;
        const dy = targetY - startY;
        const curveHeight = 150;

        const cp1x = startX + dx * 0.3;
        const cp1y = startY + dy * 0.3 - curveHeight;

        const cp2x = startX + dx * 0.7;
        const cp2y = startY + dy * 0.7 - curveHeight;

        let startAngle = sprite.angle;
        let targetAngle = 360;

        this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 600,
            ease: 'Cubic.InOut',
            onUpdate: (tween) => {
                const t = tween.getValue();

                const x = Phaser.Math.Interpolation.CubicBezier(t, startX, cp1x, cp2x, targetX);
                const y = Phaser.Math.Interpolation.CubicBezier(t, startY, cp1y, cp2y, targetY);

                sprite.setPosition(x, y);
                sprite.angle = Phaser.Math.Linear(startAngle, targetAngle, t);
            },
            onComplete: () => {
                sprite.x = targetX;
                sprite.y = targetY;
                sprite.angle = 0;
                // this.startHint();
                if (onComplete) onComplete();
            }
        });
    }

    showWin() {
        this.gameOver = true;
        this.canClick = false;

        this.scene.time.addEvent({
            delay: 900,
            callback: () => {
                this.superWag.visible = true;
                this.superWag.setAngle(-30);
                this.scene.bar.hide();
                this.superWag.fx.play("fx");

                const allCards = [...this.topCards, ...this.bottomCards, ...this.targetCards];
                allCards.forEach((card, i) => {
                    this.scene.tweens.add({
                        targets: card,
                        x: card.x + Phaser.Math.Between(250, 500),
                        y: card.y + Phaser.Math.Between(-200, 200),
                        angle: Phaser.Math.Between(-90, 90),
                        alpha: 0,
                        duration: Phaser.Math.Between(700, 1200),
                        ease: "Cubic.Out",
                        delay: i * 20
                    });
                });

                this.scene.tweens.add({
                    targets: this.superWag,
                    x: 500,
                    scale: { from: .5, to: this.superWag.scaleX },
                    angle: 0,
                    duration: 2500,
                    ease: 'Cubic.Out',
                    onComplete: () => {
                        this.superWag.visible = false;
                    }
                });

                this.scene.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.hide();
                        this.scene.endCard.show();
                    }
                });
            }
        });
    }

    startHint() {
        if (this.hintDelay) this.scene.time.removeEvent(this.hintDelay);
        this.hintDelay = this.scene.time.addEvent({
            delay: this.hintTimer,
            callback: () => {
                this.showHint();
            }
        })
    }

    showHint() {
        if (this.gameOver) return;

        const expected = this.cardPlayOrder[this.currentIndex + 1];
        if (!expected) return;

        let card = this.topCards.find(c => c.data.front === expected && c.data.isFlipped && !c.placed);
        if (!card) {
            card = this.bottomCards.find(c => c.data.front === expected && c.data.isFlipped && !c.placed);
        }

        if (card) {
            this.add(this.handSprite);
            this.handSprite.x = card.x;
            this.handSprite.y = card.y;
            this.handSprite.visible = true;
            this.bringToTop(this.handSprite);

            this.handTween = this.scene.tweens.add({
                targets: this.handSprite,
                scale: { from: this.handSprite.scaleX, to: this.handSprite.scaleX - 0.1 },
                duration: 600,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    this.stopHint();
                }
            });
        }
    }

    stopHint() {
        this.handSprite.visible = false;
        this.handSprite.setScale(1);

        if (this.handTween) this.handTween.stop();
    }

    adjust() {
        this.setScale(1)
        this.x = dimensions.gameWidth / 2;
        this.y = dimensions.gameHeight / 2 + 200;
    }
}