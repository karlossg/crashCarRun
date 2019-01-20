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
    this.temp = this.add.text(16, 32, 'Predkosc: 0', { fontSize: '32px', fill: '#953' });
  }

  create() {
    this.player = this.physics.add.image(500, 500, "player")
    this.player.setMaxVelocity(1000);
    
    this.player.setCollideWorldBounds(true);
    this.player.onWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();


  }

  update() {
    if (this.cursors.up.isDown) {
      this.temp.setText(`predkosc: ${this.player.body.velocity.y}`)
      console.log(this.player.body.acceleration)
      this.physics.velocityFromRotation(
        this.player.rotation,
        1000,
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
