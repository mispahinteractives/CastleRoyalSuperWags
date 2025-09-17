import {
    Scene
} from "phaser";
import { EndCard } from "../objects/EndCard.js";
import { GamePlay } from "../objects/game-play.js";
import { Intro } from "../objects/intro.js";
import { Bar } from "../objects/bar.js";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    create() {
        this.level = 0;

        this.supergroup = this.add.container();
        this.gameGroup = this.add.container();
        this.supergroup.add(this.gameGroup);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.game.sound.pauseAll();
            } else {
                this.game.sound.resumeAll();
            }
        });

        let width = this.game.canvas.style.width;
        let height = this.game.canvas.style.height;

        width = Number(width.slice(0, width.length - 2));
        height = Number(height.slice(0, height.length - 2));

        this.bg = this.add.sprite(width / 2, height / 2, "BG");
        this.gameGroup.add(this.bg);

        this.gamePlay = new GamePlay(this, 0, 0);
        this.bar = new Bar(this, 0, 0);
        this.intro = new Intro(this, 0, 0);

        this.blueGraphicsGrp = this.add.container();

        this.blueGraphics = this.make.graphics().fillStyle(0x000000, 1).fillRect(dimensions.leftOffset, dimensions.topOffset, dimensions.actualWidth, dimensions.actualHeight);
        this.blueGraphicsGrp.add(this.blueGraphics);

        this.whiteGraphicsGrp = this.add.container();

        this.whiteGraphics = this.make.graphics().fillStyle(0x000000, 1).fillRect(dimensions.leftOffset, dimensions.topOffset, dimensions.actualWidth, dimensions.actualHeight);
        this.whiteGraphicsGrp.add(this.whiteGraphics);

        this.whiteGraphicsGrp.alpha = 0;
        this.blueGraphicsGrp.alpha = 0;

        this.endCard = new EndCard(this, 0, 0);

        this.logo = this.add.sprite(0, 0, "sheet", "Solitaire-CR_Logo");
        this.logo.setScale(1)

        this.gameGroup.add(this.gamePlay);
        this.gameGroup.add(this.bar);
        this.gameGroup.add(this.intro);
        this.gameGroup.add(this.endCard);
        this.gameGroup.add(this.blueGraphicsGrp);
        this.gameGroup.add(this.whiteGraphicsGrp);

        this.gameGroup.add(this.logo);

        window.addEventListener('resize', function(event) {
            this.resizeGame();
        }.bind(this), true);

        this.resizeGame();

        setTimeout(() => {
            showGameScreen();
            this.bar.show();
            // this.bar.moveBarToTop();
            // this.endCard.show();
        }, 400);

        this.firstTouchDetected = false;
        this.firstTouch();
    }

    addWinGraphics() {

        this.tweens.add({
            targets: this.whiteGraphicsGrp,
            alpha: 1,
            duration: 200,
            ease: 'Linear',
            onComplete: () => {
                this.tweens.add({
                    targets: [this.whiteGraphicsGrp, this.blueGraphicsGrp],
                    alpha: 0,
                    duration: 200,
                    ease: 'Linear',
                    delay: 300,
                });
            }
        });

        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.gameGroup.bringToTop(this.whiteGraphicsGrp);
                this.gameGroup.bringToTop(this.blueGraphicsGrp);
                this.gameGroup.bringToTop(this.logo);
                this.blueGraphicsGrp.alpha = 1;
            }
        });

        this.tweens.add({
            targets: this.blueGraphicsGrp,
            alpha: 1,
            duration: 400,
            ease: 'Linear',
        })
    }

    firstTouch() {

        this.input.on('pointerdown', this.firstTouchEvent, this);
    }

    firstTouchEvent() {
        if (this.firstTouchDetected) return
        this.firstTouchDetected = true;
        console.log('First touch detected!');
        this.bgm = this.sound.add('bgm', {
            loop: true,
            volume: 1
        });
        this.bgm.play();
    }

    playFirstSound() {
        console.log('First touch detected!');
        this.bgm = this.sound.add('bgm', {
            loop: true,
            volume: 1
        });
        this.bgm.play();
    }

    hideUI() {
        this.scene.add.tween({
            targets: [this.logo, this.gamePlay, this.intro, this.bar],
            alpha: 0,
            duration: 300,
            ease: 'Linear',
            onComplete: () => {
                this.boltFx.visible = false;
                this.scene.bar.moveBarToTop();

            }
        })
    }

    addCard(card) {
        if (!card.visible) return
        this.level++;
        let xPos = (card.x * this.gamePlay.scaleX) + this.gamePlay.x;
        let yPos = (card.y * this.gamePlay.scaleY) + this.gamePlay.y;
        let grp = this.add.container();
        this.gameGroup.add(grp);

        let tile = this.add.sprite(xPos, yPos, "sheet", "Bolt Icon");
        tile.setOrigin(0.5);
        tile.setScale(.5);
        this.gameGroup.add(tile);

        let toX = (this.bar.circle.x * this.bar.scaleX) + this.bar.x;
        let toY = (this.bar.circle.y * this.bar.scaleY) + this.bar.y;
        // this.tweens.add({ targets: tile, x: toX, duration: 500, ease: 'Linear', });
        this.tweens.add({ targets: tile, scaleX: { from: tile.scaleX, to: tile.scaleX + 1.5 }, scaleY: { from: tile.scaleY, to: tile.scaleY + 1.5 }, duration: 500, ease: 'Linear' });
        this.tweens.add({
            targets: tile,
            x: [tile.x, tile.x - 250, toX],
            y: [tile.y, tile.y - 200, toY],
            interpolation: 'bezier',
            duration: 500,
            ease: "Linear",
            delay: 100,
            // this.tweens.add({
            //     targets: tile,
            //     y: toY,
            //     duration: 500,
            //     ease: 'Back.Out',
            onComplete: () => {
                tile.destroy();
                this.bar.increaseBar()
            },
        });

    }

    setGameScale() {

        if (dimensions.isLandScape) {
            dimensions.gameHeight = 540;
            dimensions.gameWidth = 960;
        } else {

            dimensions.gameHeight = 960;
            dimensions.gameWidth = 540;
        }
        let scaleX = dimensions.fullWidth / dimensions.gameWidth;
        let scaleY = dimensions.fullHeight / dimensions.gameHeight;

        this.gameScale = (scaleX < scaleY) ? scaleX : scaleY;

        dimensions.actualWidth = this.game.canvas.width / this.gameScale;
        dimensions.actualHeight = this.game.canvas.height / this.gameScale;

        dimensions.leftOffset = -(dimensions.actualWidth - dimensions.gameWidth) / 2;
        dimensions.rightOffset = dimensions.gameWidth - dimensions.leftOffset;
        dimensions.topOffset = -(dimensions.actualHeight - dimensions.gameHeight) / 2;
        dimensions.bottomOffset = dimensions.gameHeight - dimensions.topOffset;

    }

    resizeGame() {

        let ratio;

        if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
        else if (window.devicePixelRatio !== undefined)
            ratio = window.devicePixelRatio;

        try {
            let size = dapi.getScreenSize();

            dimensions.fullWidth = size.width;
            dimensions.fullHeight = size.height;
        } catch (e) {
            dimensions.fullWidth = Math.ceil(window.innerWidth * ratio);
            dimensions.fullHeight = Math.ceil(window.innerHeight * ratio);
        }

        dimensions.ratio = ratio;

        if (this.game.canvas.width === dimensions.fullWidth && this.game.canvas.height === dimensions.fullHeight) {
            return;
        }

        if (dimensions.fullWidth < dimensions.fullHeight) {
            this.switchMode(true, false);
        } else {
            this.switchMode(false, true);
        }

        this.game.scale.setGameSize(dimensions.fullWidth, dimensions.fullHeight);

        this.game.canvas.style.width = dimensions.fullWidth + 'px';
        this.game.canvas.style.height = dimensions.fullHeight + 'px';
        this.game.scale.updateBounds();
        this.game.scale.refresh()

        this.setGameScale();
        this.setPositions();

        this.adjustGame();
    }

    switchMode(portrait, landscape) {


        dimensions.isPortrait = portrait;
        dimensions.isLandscape = landscape;

        let mode = { width: 540, height: 960 };

        if (dimensions.isLandscape)
            mode = { width: 960, height: 540 };

        dimensions.gameWidth = mode.gameWidth;
        dimensions.gameHeight = mode.gameHeight;

    }

    setPositions() {

        this.supergroup.scale = (this.gameScale);
        this.gameGroup.x = (this.game.canvas.width / this.gameScale - dimensions.gameWidth) / 2;
        this.gameGroup.y = (this.game.canvas.height / this.gameScale - dimensions.gameHeight) / 2;
    }

    hideUI() {
        this.tweens.add({
            targets: this.logo,
            alpha: 0,
            duration: 250,
            ease: 'Power2',
            onComplete: () => {

            }
        })
    }

    adjustGame() {
        this.bg.setScale(1);
        let scaleX = dimensions.actualWidth / this.bg.displayWidth;
        let scaleY = dimensions.actualHeight / this.bg.displayHeight;
        let scale = Math.max(scaleX, scaleY);
        this.bg.setScale(scale);

        this.bg.x = dimensions.gameWidth / 2;
        this.bg.y = dimensions.gameHeight / 2;

        this.logo.x = dimensions.leftOffset + 95;
        this.logo.y = dimensions.topOffset + 55;
        this.logo.setScale(.6);

        this.gamePlay.adjust();
        this.endCard.adjust();
        this.intro.adjust();
        this.bar.adjust();

        if (this.whiteGraphics) this.whiteGraphics.destroy();
        this.whiteGraphics = this.make.graphics().fillStyle(0xffffff, 1).fillRect(dimensions.leftOffset, dimensions.topOffset, dimensions.actualWidth, dimensions.actualHeight);
        this.whiteGraphicsGrp.add(this.whiteGraphics);

        if (this.blueGraphics) this.blueGraphics.destroy();
        this.blueGraphics = this.make.graphics().fillStyle(0X00ffff, 1).fillRect(dimensions.leftOffset, dimensions.topOffset, dimensions.actualWidth, dimensions.actualHeight);
        this.blueGraphicsGrp.add(this.blueGraphics);
    }

    offsetMouse() {


        return {
            x: (this.game.input.activePointer.x * dimensions.actualWidth / dimensions.fullWidth) + ((dimensions.gameWidth - dimensions.actualWidth) / 2),
            y: (this.game.input.activePointer.y * dimensions.actualHeight / dimensions.fullHeight) + ((dimensions.gameHeight - dimensions.actualHeight) / 2)
        };
    }

    offsetWorld(point) {
        return {
            x: (point.x * dimensions.actualWidth / dimensions.fullWidth),
            y: (point.y * dimensions.actualHeight / dimensions.fullHeight)
        };
    }

    update() {

    }
}