/**
 *
 *
 * @class TestScene
 * @extends {Phaser.Scene}
 */
class TestScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite | any;
  // player2: Phaser.GameObjects.Sprite;
  cursors: any;

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/desert.json");
    this.load.image("Desert", "/assets/tilemaps/tmw_desert_spacing.png");
    this.load.image("player", "/assets/PNG/Cars/car_yellow_small_5.png");
  }

  create() {
    var map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: "map" });
    // var tileset:Phaser.Tilemaps.Tileset = map.addTilesetImage('Desert');
    // var layer:Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);

    this.player = this.physics.add.image(500, 500, "player");
    this.player.setDamping(true);
    this.player.setDrag(0.99);
    this.player.setMaxVelocity(200);
    this.cursors = this.input.keyboard.createCursorKeys();

    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.startFollow(this.player, false);
  }

  update() {
    if (this.cursors.up.isDown) {
      console.log(typeof  this.player.body.acceleration)
      this.physics.velocityFromRotation(
        this.player.rotation,
        200,
        this.player.body.acceleration
      );
    } else {
      this.player.setAcceleration(0);
    }
    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(300);
    } else {
      this.player.setAngularVelocity(0);
    }
    
    this.physics.world.wrap(this.player, 32);

  }
}

export default TestScene;
