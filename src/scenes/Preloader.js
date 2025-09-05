import { Scene } from "phaser";
import bgm from "../data/bgm";
import click from "../data/click";
import win from "../data/win";
import positive1 from "../data/positive1";
import positive2 from "../data/positive2";
import positive3 from "../data/positive3";
import card from "../data/card";
import sheet from "../data/sheet";
import firework1 from "../data/firework1";
import firework2 from "../data/firework2";
import firework3 from "../data/firework3";
import bg from "../data/bg";

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

        let cardJs = {
            "frames": [

                {
                    "filename": "Back_Card_",
                    "frame": { "x": 2, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-2",
                    "frame": { "x": 79, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-3",
                    "frame": { "x": 79, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-4",
                    "frame": { "x": 156, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-5",
                    "frame": { "x": 156, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-6",
                    "frame": { "x": 233, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-7",
                    "frame": { "x": 233, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-8",
                    "frame": { "x": 310, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-9",
                    "frame": { "x": 310, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-10",
                    "frame": { "x": 2, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-A",
                    "frame": { "x": 387, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-J",
                    "frame": { "x": 387, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-K",
                    "frame": { "x": 464, "y": 2, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Diamonds-Q",
                    "frame": { "x": 464, "y": 118, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                }
            ],
            "meta": {
                "app": "https://www.codeandweb.com/texturepacker",
                "version": "1.0",
                "image": "card.png",
                "format": "RGBA8888",
                "size": { "w": 540, "h": 233 },
                "scale": "1",
                "smartupdate": "$TexturePacker:SmartUpdate:6892736a992da80b2efc28cff7210fbe:dbbe009f3fcc76a52fc19e684df15f9e:174aba2fcc0fb5b96352486c74cc3599$"
            }
        }

        let sheetJs = {
            "frames": [

                {
                    "filename": "Back_Card_",
                    "frame": { "x": 1138, "y": 227, "w": 74, "h": 113 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 74, "h": 113 },
                    "sourceSize": { "w": 74, "h": 113 }
                },
                {
                    "filename": "Blue_Circle",
                    "frame": { "x": 685, "y": 845, "w": 360, "h": 360 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 360, "h": 360 },
                    "sourceSize": { "w": 360, "h": 360 }
                },
                {
                    "filename": "bolt back circle_",
                    "frame": { "x": 1099, "y": 128, "w": 96, "h": 96 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 96, "h": 96 },
                    "sourceSize": { "w": 96, "h": 96 }
                },
                {
                    "filename": "Bolt Icon",
                    "frame": { "x": 1936, "y": 484, "w": 42, "h": 62 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 42, "h": 62 },
                    "sourceSize": { "w": 42, "h": 62 }
                },
                {
                    "filename": "Cape",
                    "frame": { "x": 423, "y": 878, "w": 240, "h": 197 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 147, "w": 240, "h": 197 },
                    "sourceSize": { "w": 240, "h": 344 }
                },
                {
                    "filename": "Card_Outer-glow",
                    "frame": { "x": 1862, "y": 220, "w": 80, "h": 111 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 80, "h": 111 },
                    "sourceSize": { "w": 80, "h": 111 }
                },
                {
                    "filename": "Collect-C",
                    "frame": { "x": 1785, "y": 561, "w": 60, "h": 75 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 60, "h": 75 },
                    "sourceSize": { "w": 60, "h": 75 }
                },
                {
                    "filename": "Collect-E",
                    "frame": { "x": 1959, "y": 643, "w": 55, "h": 76 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 55, "h": 76 },
                    "sourceSize": { "w": 55, "h": 76 }
                },
                {
                    "filename": "Collect-L",
                    "frame": { "x": 1950, "y": 378, "w": 53, "h": 76 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 53, "h": 76 },
                    "sourceSize": { "w": 53, "h": 76 }
                },
                {
                    "filename": "Collect-O",
                    "frame": { "x": 1945, "y": 220, "w": 70, "h": 76 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 70, "h": 76 },
                    "sourceSize": { "w": 70, "h": 76 }
                },
                {
                    "filename": "Collect-T",
                    "frame": { "x": 1138, "y": 343, "w": 59, "h": 75 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 59, "h": 75 },
                    "sourceSize": { "w": 59, "h": 75 }
                },
                {
                    "filename": "Download-Now",
                    "frame": { "x": 1271, "y": 697, "w": 308, "h": 134 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 308, "h": 134 },
                    "sourceSize": { "w": 308, "h": 134 }
                },
                {
                    "filename": "electric effect",
                    "frame": { "x": 1862, "y": 77, "w": 109, "h": 140 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 109, "h": 140 },
                    "sourceSize": { "w": 109, "h": 140 }
                },
                {
                    "filename": "favicon",
                    "frame": { "x": 1822, "y": 941, "w": 154, "h": 154 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 154, "h": 154 },
                    "sourceSize": { "w": 154, "h": 154 }
                },
                {
                    "filename": "fx/01",
                    "frame": { "x": 1630, "y": 986, "w": 189, "h": 196 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 189, "h": 196 },
                    "sourceSize": { "w": 189, "h": 196 }
                },
                {
                    "filename": "fx/02",
                    "frame": { "x": 2, "y": 950, "w": 418, "h": 169 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 418, "h": 169 },
                    "sourceSize": { "w": 418, "h": 169 }
                },
                {
                    "filename": "fx/03",
                    "frame": { "x": 1224, "y": 2, "w": 593, "h": 122 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 593, "h": 122 },
                    "sourceSize": { "w": 593, "h": 122 }
                },
                {
                    "filename": "fx/04",
                    "frame": { "x": 460, "y": 128, "w": 636, "h": 109 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 636, "h": 109 },
                    "sourceSize": { "w": 636, "h": 109 }
                },
                {
                    "filename": "fx/05",
                    "frame": { "x": 2, "y": 1122, "w": 402, "h": 63 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 402, "h": 63 },
                    "sourceSize": { "w": 402, "h": 63 }
                },
                {
                    "filename": "fx/06",
                    "frame": { "x": 1657, "y": 352, "w": 76, "h": 31 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 76, "h": 31 },
                    "sourceSize": { "w": 76, "h": 31 }
                },
                {
                    "filename": "Hand",
                    "frame": { "x": 1001, "y": 240, "w": 134, "h": 165 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 9, "y": 7, "w": 134, "h": 165 },
                    "sourceSize": { "w": 144, "h": 172 }
                },
                {
                    "filename": "info",
                    "frame": { "x": 1387, "y": 834, "w": 240, "h": 240 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 240, "h": 240 },
                    "sourceSize": { "w": 240, "h": 240 }
                },
                {
                    "filename": "intro/_zap_",
                    "frame": { "x": 460, "y": 429, "w": 22, "h": 22 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 22, "h": 22 },
                    "sourceSize": { "w": 22, "h": 22 }
                },
                {
                    "filename": "intro/Text_and",
                    "frame": { "x": 1785, "y": 484, "w": 148, "h": 74 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 1, "y": 1, "w": 148, "h": 74 },
                    "sourceSize": { "w": 150, "h": 75 }
                },
                {
                    "filename": "intro/Text_level!",
                    "frame": { "x": 423, "y": 1078, "w": 216, "h": 80 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 1, "w": 216, "h": 80 },
                    "sourceSize": { "w": 217, "h": 81 }
                },
                {
                    "filename": "intro/Text_the",
                    "frame": { "x": 1848, "y": 561, "w": 143, "h": 79 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 1, "w": 143, "h": 79 },
                    "sourceSize": { "w": 144, "h": 80 }
                },
                {
                    "filename": "intro/Text_wags",
                    "frame": { "x": 1818, "y": 863, "w": 197, "h": 75 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 1, "y": 1, "w": 197, "h": 75 },
                    "sourceSize": { "w": 199, "h": 76 }
                },
                {
                    "filename": "intro/Text_Will",
                    "frame": { "x": 1820, "y": 2, "w": 167, "h": 72 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 1, "y": 2, "w": 167, "h": 72 },
                    "sourceSize": { "w": 169, "h": 75 }
                },
                {
                    "filename": "intro/Text_ZAP_",
                    "frame": { "x": 1822, "y": 1098, "w": 154, "h": 79 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 1, "y": 1, "w": 154, "h": 79 },
                    "sourceSize": { "w": 155, "h": 80 }
                },
                {
                    "filename": "Level-BG",
                    "frame": { "x": 2, "y": 462, "w": 387, "h": 485 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 387, "h": 485 },
                    "sourceSize": { "w": 387, "h": 485 }
                },
                {
                    "filename": "Mask",
                    "frame": { "x": 1818, "y": 776, "w": 197, "h": 84 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 197, "h": 84 },
                    "sourceSize": { "w": 197, "h": 84 }
                },
                {
                    "filename": "Particle-Dot",
                    "frame": { "x": 1845, "y": 720, "w": 53, "h": 53 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 1, "y": 1, "w": 53, "h": 53 },
                    "sourceSize": { "w": 55, "h": 55 }
                },
                {
                    "filename": "Prograss-Bar-BG",
                    "frame": { "x": 1657, "y": 127, "w": 202, "h": 222 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 202, "h": 222 },
                    "sourceSize": { "w": 202, "h": 222 }
                },
                {
                    "filename": "Prograss-Bar-Fill_01",
                    "frame": { "x": 1845, "y": 643, "w": 111, "h": 74 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 111, "h": 74 },
                    "sourceSize": { "w": 111, "h": 74 }
                },
                {
                    "filename": "Prograss-Bar-Fill_02",
                    "frame": { "x": 1785, "y": 352, "w": 162, "h": 129 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 162, "h": 129 },
                    "sourceSize": { "w": 162, "h": 129 }
                },
                {
                    "filename": "Prograss-Bar-Fill_03",
                    "frame": { "x": 1630, "y": 776, "w": 185, "h": 207 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 185, "h": 207 },
                    "sourceSize": { "w": 185, "h": 207 }
                },
                {
                    "filename": "Solitaire-CR_Logo",
                    "frame": { "x": 1582, "y": 639, "w": 260, "h": 134 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 260, "h": 134 },
                    "sourceSize": { "w": 260, "h": 134 }
                },
                {
                    "filename": "SUPER CHEST UNLOCKED",
                    "frame": { "x": 460, "y": 2, "w": 761, "h": 123 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 761, "h": 123 },
                    "sourceSize": { "w": 761, "h": 123 }
                },
                {
                    "filename": "Super-Chest",
                    "frame": { "x": 1271, "y": 424, "w": 297, "h": 270 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 297, "h": 270 },
                    "sourceSize": { "w": 297, "h": 271 }
                },
                {
                    "filename": "Super-wags",
                    "frame": { "x": 1224, "y": 127, "w": 430, "h": 294 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 6, "y": 1, "w": 430, "h": 294 },
                    "sourceSize": { "w": 438, "h": 296 }
                },
                {
                    "filename": "Talon-Base",
                    "frame": { "x": 1387, "y": 1077, "w": 238, "h": 92 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 238, "h": 92 },
                    "sourceSize": { "w": 238, "h": 92 }
                },
                {
                    "filename": "Text_3",
                    "frame": { "x": 1950, "y": 299, "w": 58, "h": 76 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 58, "h": 76 },
                    "sourceSize": { "w": 58, "h": 76 }
                },
                {
                    "filename": "Text_SUPER",
                    "frame": { "x": 460, "y": 240, "w": 538, "h": 186 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 2, "y": 4, "w": 538, "h": 186 },
                    "sourceSize": { "w": 543, "h": 195 }
                },
                {
                    "filename": "VFX_God-Rays",
                    "frame": { "x": 2, "y": 2, "w": 455, "h": 457 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 18, "y": 15, "w": 455, "h": 457 },
                    "sourceSize": { "w": 489, "h": 485 }
                },
                {
                    "filename": "VFX_Ring",
                    "frame": { "x": 1048, "y": 845, "w": 336, "h": 337 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 336, "h": 337 },
                    "sourceSize": { "w": 336, "h": 337 }
                },
                {
                    "filename": "Wags1",
                    "frame": { "x": 392, "y": 462, "w": 290, "h": 413 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 290, "h": 413 },
                    "sourceSize": { "w": 291, "h": 430 }
                },
                {
                    "filename": "Wags2",
                    "frame": { "x": 685, "y": 429, "w": 290, "h": 413 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 290, "h": 413 },
                    "sourceSize": { "w": 291, "h": 430 }
                },
                {
                    "filename": "Wags3",
                    "frame": { "x": 978, "y": 429, "w": 290, "h": 413 },
                    "rotated": false,
                    "trimmed": true,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 290, "h": 413 },
                    "sourceSize": { "w": 291, "h": 430 }
                },
                {
                    "filename": "wave_1",
                    "frame": { "x": 1571, "y": 424, "w": 211, "h": 212 },
                    "rotated": false,
                    "trimmed": false,
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 211, "h": 212 },
                    "sourceSize": { "w": 211, "h": 212 }
                }
            ],
            "meta": {
                "app": "https://www.codeandweb.com/texturepacker",
                "version": "1.0",
                "image": "sheet.png",
                "format": "RGBA8888",
                "size": { "w": 2017, "h": 1207 },
                "scale": "1",
                "smartupdate": "$TexturePacker:SmartUpdate:ed050954678e7ca72e18f10f89e5d471:8b80265fea3e2c1b16208c22ae43969e:9c44ecd7e9a522007eaff2949095bc1d$"
            }
        }

        this.load.atlas('sheet', sheet.image, sheetJs);
        this.load.atlas('card', card.image, cardJs);
        this.load.image("BG", bg.image)
        this.load.image("Fireworks_1", firework1.image)
        this.load.image("Fireworks_2", firework2.image)
        this.load.image("Fireworks_3", firework3.image)

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