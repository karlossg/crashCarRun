import Phaser from 'phaser';
class Game extends Phaser.Scene {
  constructor() {
    super('Game')
  }
  preaload() {
    // this.add.text(100, 100, 'Phaser + Parcel');
  }
  create() {
    this.add.text(100, 100, 'Phaser + Parcel');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 800,
  scene: Game,
  backgroundColor: '#5B5678',
  physics: {
    default: "arcade"
  },
};

new Phaser.Game(config);

if (module.hot) {
  module.hot.accept(() => {});

  module.hot.dispose(() => {
    window.location.reload();
  });
}

