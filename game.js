let score = 0
let scoreText
let platforms
let bitcoins
let cursors
let player
let enemy
// let enemies
let overlay = document.getElementById("overlay");
let gameHeader = document.createElement("h1")
let newUserButton = document.createElement("button");
let existingUserButton = document.createElement("button");
let findOverlay = document.getElementById("overlay")
gameHeader.innerText = "RAT RACE"
newUserButton.innerText = "New User"
existingUserButton.innerText = "Existing User"
newUserButton.addEventListener('click', function(e) {
  prompt("Name")
  start();
});
existingUserButton.addEventListener('click', function(e){
  prompt("You are being queried")
  start();
})

startScreen();

function startScreen(){
  overlay.appendChild(gameHeader)
  overlay.appendChild(newUserButton)
  overlay.appendChild(existingUserButton)
  overlay.style.display;
}

function start() {
  findOverlay.remove()
    const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    })



    function preload() {
      game.load.image('city_background', 'assets/city_background.png')
      game.load.image('ground', 'assets/platform.png')
      game.load.image('bitcoin', 'assets/bitcoin.png')
      game.load.spritesheet('enemy', 'assets/pigeon.png', 32, 32)
      game.load.spritesheet('woof', 'assets/woof.png', 32, 32)
    }

    function create() {
      // system create
      game.physics.startSystem(Phaser.Physics.ARCADE)
      game.add.sprite(0, 0, 'city_background')

      // platform create
      platforms = game.add.group()
      platforms.enableBody = true

      let ground = platforms.create(0, game.world.height - 64, 'ground')
      ground.scale.setTo(2, 2)
      ground.body.immovable = true

      // ledges create
      let ledge = platforms.create(100, 450, 'ground')
      ledge.body.immovable = true

      ledge = platforms.create(-75, 150, 'ground')
      ledge.body.immovable = true

      // player create
      player = game.add.sprite(50, game.world.height - 250, 'woof')
      game.physics.arcade.enable(player)
      player.body.bounce.y = 0.5
      player.body.gravity.y = 800
      player.body.collideWorldBounds = true
      player.animations.add('left', [0, 1], 10, true)
      player.animations.add('right', [2, 3], 10, true)


      // enemies create
      enemy = game.add.sprite(750, game.world.height - 250, 'enemy')
      game.physics.arcade.enable(enemy)
      enemy.body.bounce.y = 0.5
      enemy.body.gravity.y = 800
      enemy.body.collideWorldBounds = true
      enemy.animations.add('left', [10, 11, 12], 10, true)
      enemy.animations.add('right', [3, 4, 5], 15, true)


      // bitcoin create
      bitcoins = game.add.group()
      bitcoins.enableBody = true


      // randomize bitcoin
      for (var i = 0; i < 12; i++) {
        let bitcoin = bitcoins.create(i * 70, 0, 'bitcoin')
        bitcoin.body.gravity.y = 1000
        bitcoin.body.bounce.y = 0.3 + Math.random() * 0.2
      }



      // set score text
      scoreText = game.add.text(16, 16, '', {
        fontSize: '32px',
        fill: '#000'
      })
      // initiate cursors
      cursors = game.input.keyboard.createCursorKeys()
    }


    function update() {
      // player update
      player.body.velocity.x = 0
      game.physics.arcade.collide(player, platforms)
      game.physics.arcade.overlap(player, bitcoins, collectBitcoin, null, this)
      game.physics.arcade.overlap(player, enemy, collectPigeon, null, this)

      // enemy update
      enemy.body.velocity.x = -50
      game.physics.arcade.collide(enemy, platforms)

      // bitcoin update
      game.physics.arcade.collide(bitcoins, platforms)

      // game.physics.arcade.collide(enemies, platforms)

      // controls
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
      if (enemy.body.x > (game.width/2)+1) {
        enemy.body.velocity.x = -50
        enemy.animations.play('left')
      }
      else if (enemy.body.x < game.width/2) {
        enemy.body.velocity.x = 50
        enemy.animations.play('right')
      }
    }


    // scoring
    function collectBitcoin(player, bitcoin) {
      bitcoin.kill()

      score += 10
      scoreText.text = 'Score: ' + score
    }

    function collectPigeon(player, enemy) {
      player.kill()
      // alert('You suck')
      score -= 10
      scoreText.text = 'Score: ' + score
      const div = document.createElement('div')
      const h2 = document.createElement('h2')
      div.id = "overlay"
      h2.innerText = "Game Over"
      const para = document.createElement('p')
      para.innerText = `Your score is ${score}
      Click to restart!`
      const canvas = document.querySelector('canvas')
      score = 0
      canvas.remove()
      document.body.append(div)
      div.append(h2)
      div.append(para)
      div.removeAttribute('style')
      div.addEventListener('click', function(){
        while (div.hasChildNodes()) {
          div.removeChild(div.lastChild);
        }
        start();
      })
    }

    // function fillInEndGameInfo(){
    //   return `
    //   <h3>End of game</h3>
    //   <div>Hi Score</div>
    //   `
    // }

  };


// document.querySelector('canvas')
// <canvas width=​"800" height=​"600" style=​"display:​ block;​ touch-action:​ none;​ user-select:​ none;​ -webkit-tap-highlight-color:​ rgba(0, 0, 0, 0)​;​">​
// var x = document.querySelector('canvas')
// undefined
// x
// <canvas width=​"800" height=​"600" style=​"display:​ block;​ touch-action:​ none;​ user-select:​ none;​ -webkit-tap-highlight-color:​ rgba(0, 0, 0, 0)​;​">​
// x.remove()
// undefined
