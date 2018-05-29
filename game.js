const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

let score = 0
let scoreText
let platforms
let bitcoins
let cursors
let player
let pigeons
let enemies
function preload() {
  game.load.image('city_background', 'assets/city_background.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('bitcoin', 'assets/bitcoin.png')
  game.load.spritesheet('pigeon', 'assets/pigeon.png', 32, 32)
  game.load.spritesheet('woof', 'assets/woof.png', 32, 32)
  game.load.spritesheet('enemy', 'assets/YeOldyNecroGuy.png', 32, 32)


}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  game.add.sprite(0, 0, 'city_background')

  platforms = game.add.group()

  platforms.enableBody = true

  let ground = platforms.create(0, game.world.height - 64, 'ground')

  ground.scale.setTo(2, 2)

  ground.body.immovable = true

  let ledge = platforms.create(400, 450, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-75, 350, 'ground')
  ledge.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, 'woof')

  game.physics.arcade.enable(player)

  player.body.bounce.y = 0.5
  player.body.gravity.y = 800
  player.body.collideWorldBounds = true

  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)

  bitcoins = game.add.group()
  pigeons = game.add.group()
  enemies = game.add.group()

  bitcoins.enableBody = true
  pigeons.enableBody = true
  enemies.enableBody = true

  for (var i = 0; i < 12; i++) {
    let bitcoin = bitcoins.create(i * 70, 0, 'bitcoin')

    bitcoin.body.gravity.y = 1000
    bitcoin.body.bounce.y = 0.3 + Math.random() * 0.2
  }

  for (var i = 0; i < 15; i++) {
    let pigeon = pigeons.create(i * 50, 0, 'pigeon')

    pigeon.body.gravity.y = 1000
    pigeon.body.bounce.y = 0.3 + Math.random() * 0.2
  }
  for(var i = 0; i < 10; i++){
    let enemy = enemies.create(game.world.randomX, game.world.randomY, 'enemy')
  }

  scoreText = game.add.text(16, 16, '', {
    fontSize: '32px',
    fill: '#000'
  })

  cursors = game.input.keyboard.createCursorKeys()
}

function update() {
  player.body.velocity.x = 0

  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(bitcoins, platforms)
  game.physics.arcade.collide(pigeons, platforms)

  game.physics.arcade.overlap(player, bitcoins, collectBitcoin, null, this)
  game.physics.arcade.overlap(player, pigeons, collectPigeon, null, this)

  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    player.animations.stop()
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -900
  }
  if (score === 120) {
    alert('You collected all of the bitcoin!')
    score = 0
  }
}

function collectBitcoin(player, bitcoin) {
  bitcoin.kill()

  score += 10
  scoreText.text = 'Score: ' + score
}

function collectPigeon(player, pigeon) {
  pigeon.kill()

  score -= 10
  scoreText.text = 'Score: ' + score
}
