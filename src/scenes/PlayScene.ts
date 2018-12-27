/**
 *
 *
 * @class TestScene
 * @extends {Phaser.Scene}
 */
class TestScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite;
  player2: Phaser.GameObjects.Sprite;
  cursors: any;

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/desert.json");
    this.load.image("Desert", "/assets/tilemaps/tmw_desert_spacing.png");
    this.load.image("player", "/assets/PNG/Cars/car_black_1.png");
  }

  create() {
    var map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: "map" });
    // var tileset:Phaser.Tilemaps.Tileset = map.addTilesetImage('Desert');
    // var layer:Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);

    this.player = this.add.sprite(500, 500, "player");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, false);
  }

  update(time: number, delta: number) {
    // this.player.angle += 1;
    if (this.cursors.left.isDown) {
      this.player.angle -= 5;

      // console.log(Number(this.player.angle.toFixed(0)));
      // console.log(Number(this.player.angle.toPrecision(1)));
    }
    if (this.cursors.right.isDown) {
      // console.log(Number(this.player.angle.toPrecision(1)));
      // console.log(Number(this.player.angle.toFixed(0)));
      this.player.angle += 5;
    }
    if (this.cursors.down.isDown) {
      this.player.y += 2;
    }
    if (this.cursors.up.isDown) {
      console.log(Number(this.player.angle.toFixed(0)));
      switch (true) {
        case [0, -5, -10, -15, -20].includes(
          Number(this.player.angle.toFixed(0))
        ):
          this.player.y -= 5;
          break;
        case [-25, -30, -35, -40].includes(
          Number(this.player.angle.toFixed(0))
        ):
          this.player.y -= 5;
          this.player.x -= 5;
          break;
        case [-45, -50, -55, -60].includes(
          Number(this.player.angle.toFixed(0))
        ):
          this.player.y -= 5;
          this.player.x -= 5;
          break;
        case [-65, -70, -75, -80].includes(
          Number(this.player.angle.toFixed(0))
        ):
          this.player.y -= 10;
          this.player.x -= 10;
          break;
      }
    //   if (
    //     [-85, -85, -90, -95, -100].includes(
    //       Number(this.player.angle.toFixed(0))
    //     )
    //   ) {
    //     this.player.x -= 15;
    //     // this.player.y -= 20;
    //   }
    //   if (this.player.angle === -90) {
    //     // this.player.x -= 10;
    //     this.player.y -= 10;
    //   }
    //   if (this.player.angle > 0 && this.player.angle! < 40) {
    //     this.player.x += 5;
    //     this.player.y -= 5;
    //   }
    }
  }
}

export default TestScene;
