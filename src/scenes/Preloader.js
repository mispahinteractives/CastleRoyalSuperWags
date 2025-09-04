import { Scene } from "phaser";
import bgm from "../data/bgm";
import click from "../data/click";
import win from "../data/win";
import positive1 from "../data/positive1";
import positive2 from "../data/positive2";
import positive3 from "../data/positive3";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        const overlay = document.getElementById("overlay");
        this.load.on("complete", () => {

            this.scene.start("Game");
        });
    }

    adjustGame() {

        const scene = this.scene.get('Game');
        scene.adjustGame();
    }

    preload() {

        this.load.atlas('sheet', 'sheet/sheet.png', 'sheet/sheet.json');
        this.load.image("BG_OL", 'BG_OL.png')
        this.load.image("BG", 'BG.png')
        this.load.image("Fireworks_1", 'Fireworks_1.png')
        this.load.image("Fireworks_2", 'Fireworks_2.png')
        this.load.image("Fireworks_3", 'Fireworks_3.png')

        const audioKey = ['bgm', 'click', 'win', 'positive1', 'positive2', 'positive3'];
        let dataAudio = [bgm, click, win, positive1, positive2, positive3]

        for (let i = 0; i < audioKey.length; i++) {
            fetch(dataAudio[i].audio)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    this.sound.context.decodeAudioData(arrayBuffer, (audioBuffer) => {
                        this.cache.audio.add(audioKey[i], audioBuffer);
                    });
                });
        }
    }

    create() {

    }
}