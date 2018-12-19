import 'phaser';

import TestScene from './scenes/PlayScene';

let game;

/**
 *
 * Function used to load game config and resazing function
 * @name loadGameConfig
 * @function
 *
 */
function loadGameConfig() {
  const config = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: TestScene,
    backgroundColor: "#5B5678",
    physics: {
      default: "arcade"
    }
  };

  game = new Phaser.Game(config);
  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);
}

window.onload = () => loadGameConfig();

/**
 * Game window resazing function
 * @name resizeGame
 * @function
 *
 */
function resizeGame() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}