/**
 *
 *
 * @class TestScene
 * @extends {Phaser.Scene}
 */
class TestScene extends Phaser.Scene {
  player: Phaser.GameObjects.Sprite | any;
  cursors: any;
  map: Phaser.GameObjects.Tile;
  impact: any
  tiles: any;
  walls: any;
  layer: any;
  temp: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    this.load.image("player", "/assets/PNG/Cars/car_yellow_small_5.png");
    this.temp = this.add.text(164, 148, "Predkosc: 0", {
      fontSize: "32px",
      fill: "#953"
    });
    this.load.image("tiles", "../../assets/asphalt_road_sprite_sheet.png");
    this.load.tilemapCSV("map", "../../assets/track.csv");
  }

  create() {
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: 130,
      tileHeight: 130
    });
    this.tiles = this.map.addTilesetImage("tiles");
    this.walls = this.map.createStaticLayer(0, this.tiles, 0, 0);
    this.walls.setCollisionByExclusion([0, 1, 2, 3, 4, 5]);

    this.player = this.physics.add.image(10, 10, "player");
  
    this.player.setScale(0.5);
    this.player.setMaxVelocity(100);
    this.physics.add.collider(this.player, this.walls, null, null, null);

    this.player.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;

    this.cameras.main.setZoom(2);
    this.cameras.main.startFollow(this.player, false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    console.log(this.player.body.acceleration)
    if (this.cursors.up.isDown) {
      this.temp.setText(`predkosc: ${this.player.body.velocity.x}`);
      this.player.setMaxVelocity(150);
      this.physics.velocityFromRotation(
        this.player.rotation,
        500,
        this.player.body.velocity
      );
    } else {
      this.player.setAcceleration(0);
    }
    if (this.cursors.left.isDown) {
      this.temp.setText(`predkosc: ${this.player.body.velocity.x}`)
      this.player.setAngularVelocity(-75);
    } else if (this.cursors.right.isDown) {
      this.temp.setText(`predkosc: ${this.player.body.velocity.x}`)
      this.player.setAngularVelocity(75);
    } else {
      this.temp.setText(`predkosc: ${this.player.body.velocity.x}`)
      this.player.setAngularVelocity(0);
    }

    if (this.cursors.down.isDown) {
      this.player.setMaxVelocity(45);
      this.physics.velocityFromRotation(
        this.player.rotation,
        -125,
        this.player.body.acceleration
      );
    }

    this.physics.world.wrap(this.player, 32);
  }
}

export default TestScene;
