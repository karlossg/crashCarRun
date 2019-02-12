/**
 *
 *
 * @class TestScene
 * @extends {Phaser.Scene}
 */
class TestScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite | any;
  cursors: any;
  temp: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    this.load.image("player", "/assets/PNG/Cars/car_yellow_small_5.png");
    this.temp = this.add.text(16, 32, "Predkosc: 0", {
      fontSize: "32px",
      fill: "#953"
    });
    this.load.image("tiles", "../../assets/asphalt_road_sprite_sheet.png");
    this.load.tilemapCSV("map", "../../assets/track.csv");
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 130,
      tileHeight: 130
    });
    const tiles = map.addTilesetImage("tiles");
    map.createStaticLayer(0, tiles, 0, 0);

    this.player = this.physics.add.image(10, 10, "player");
    this.player.setScale(0.5);
    this.player.setMaxVelocity(100);

    this.player.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;

    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player, false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown) {
      this.temp.setText(`predkosc: ${this.player.body.velocity.y}`);
      this.player.setMaxVelocity(100);
      this.physics.velocityFromRotation(
        this.player.rotation,
        500,
        this.player.body.acceleration
      );
    } else {
      this.player.setAcceleration(0);
    }
    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-100);
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(100);
    } else {
      this.player.setAngularVelocity(0);
    }

    if (this.cursors.down.isDown) {
      this.physics.velocityFromRotation(
        this.player.rotation,
        -150,
        this.player.body.acceleration
      );
    }

    this.physics.world.wrap(this.player, 32);
  }
}

export default TestScene;
