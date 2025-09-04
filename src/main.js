import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

import { config } from "./config.js";
import { networkPlugin, mraidAdNetworks } from "./networkPlugin.js";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.80.0/Phaser.Types.Core.GameConfig
const gameConfig = {
    type: Phaser.CANVAS,
    backgroundColor: "#222",
    scale: {
        mode: Phaser.Scale.FIT,
        width: 540,
        height: 960,
        antialias: false,
        parent: "game-container",
    },
    scene: [Preloader, Game],
};

function initializePhaserGame() {
    return new Phaser.Game(gameConfig);
}

function setupGameInitialization(adNetworkType) {
    const game = initializePhaserGame();
    if (mraidAdNetworks.has(adNetworkType)) {
        networkPlugin.initMraid(() => game);
    } else {
        // vungle, google ads, facebook, ironsource, tiktok, mintegral
        return game;
    }

}

setupGameInitialization(config.adNetworkType);