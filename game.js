let score = 0
let scoreText
let platforms
let bitcoins
let cursors
let player
let playerObj
let enemy
let enemy2
let enemy3
let enemy4
let getUsername

// let enemies
let overlay = document.getElementById("overlay");
let gameHeader = document.createElement("h1")
let newUserButton = document.createElement("button");
let existingUserButton = document.createElement("button");
let pigeonDiv = document.createElement("div")
let pigeonAnimation = document.createElement("img");
let findOverlay = document.getElementById("overlay")
pigeonDiv.setAttribute("id", "pigeonDiv")
gameHeader.innerText = "RAT RACE"
newUserButton.innerText = "New User"
existingUserButton.innerText = "Existing User"
pigeonAnimation.class = "pig1"
pigeonAnimation.src = "/assets/pigeon_moving.gif"
//get highscores from server
function getHighScores(){
  let scores = {}
  fetch('http://localhost:3000/api/v1/scores')
  .then(res => res.json())
  .then(json => json.forEach(function(data){ data.points}))
}

//creating a new user
function post(body) {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  fetch('http://localhost:3000/api/v1/players', config).then(r => r.json()).then(data => {
    playerObj = data
  })
}

function scorePost(body) {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  fetch('http://localhost:3000/api/v1/scores', config).then(r => r.json()).then(data => console.log(data))
}
newUserButton.addEventListener('click', function(e) {
  getUsername = prompt("Please enter your username:")
  post({
    players: {
      username: getUsername
    }
  })
  start();
});
existingUserButton.addEventListener('click', function(e) {
  prompt("Username:")
  start();
})
startScreen();

function startScreen() {
  overlay.appendChild(gameHeader)
  overlay.appendChild(newUserButton)
  overlay.appendChild(existingUserButton)
  pigeonDiv.appendChild(pigeonAnimation)
  overlay.appendChild(pigeonDiv)
  overlay.style.display;
}

function start() {
  findOverlay.remove()
  const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  })

  getHighScores()

  function preload() {
    game.load.audio('bgmusic1', 'assets/sounds.mp3')
    game.load.audio('over', 'assets/over.wav')
    game.load.audio('collection', 'assets/collection.wav')
    game.load.image('city_background', 'assets/city_background.png')
    game.load.image('ledge', 'assets/ledge.png')
    game.load.image('ground', 'assets/ground.png')
    game.load.image('bitcoin', 'assets/bitcoin.png')
    game.load.spritesheet('enemy', 'assets/pigeon.png', 32, 32)
    game.load.spritesheet('woof', 'assets/woof.png', 32, 32)
  }

  function create() {
    // system create
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.add.sprite(0, 0, 'city_background')
    bgmusic = game.sound.add("bgmusic1");
    over = game.sound.add("over");
    over.volume = 0.9;
    collection = game.sound.add("collection");
    collection.volume = 0.9;
    bgmusic.volume = 0.3;
    bgmusic.loop = true;
    bgmusic.play();

    // platform create
    platforms = game.add.group()
    platforms.enableBody = true
    let ground = platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true


    // ledges create
    // let x = 100
    // let y = 150
    // for (var i = 0; i < 5; i++) {
    //   let leftLedge = platforms.create(0, x, 'ledge')
    //   leftEnemy = game.add.sprite(0, x - 25, 'enemy')
    //   game.physics.arcade.enable(leftEnemy)
    //   leftEnemy.body.bounce.y = 0.5
    //   leftEnemy.body.gravity.y = 800
    //   leftEnemy.body.velocity.x = -50
    //   leftEnemy.body.collideWorldBounds = true
    //   leftEnemy.animations.add('left', [10, 11, 12], 10, true)
    //   leftEnemy.animations.add('right', [3, 4, 5], 10, true)
    //   let rightLedge = platforms.create((game.width) - (300), y, 'ledge')
    //   rightEnemy = game.add.sprite(700, x - 50, 'enemy')
    //   game.physics.arcade.enable(rightEnemy)
    //   rightEnemy.body.bounce.y = 0.5
    //   rightEnemy.body.gravity.y = 800
    //   rightEnemy.body.velocity.x = -50
    //   rightEnemy.body.collideWorldBounds = true
    //   rightEnemy.animations.add('left', [10, 11, 12], 10, true)
    //   rightEnemy.animations.add('right', [3, 4, 5], 10, true)
    //   leftLedge.body.immovable = true
    //   rightLedge.body.immovable = true
    // }
    let ledge = platforms.create(0, 450, 'ledge')
    ledge.body.immovable = true

    ledge = platforms.create(450, 375, 'ledge')
    ledge.body.immovable = true

    ledge = platforms.create(0, 275, 'ledge')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 150, 'ledge')
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
    enemy.body.velocity.x = -50
    enemy.body.collideWorldBounds = true
    enemy.animations.add('left', [10, 11, 12], 10, true)
    enemy.animations.add('right', [3, 4, 5], 10, true)


    enemy2 = game.add.sprite(25, 125, 'enemy')
    game.physics.arcade.enable(enemy2)
    enemy2.body.bounce.y = 0.5
    enemy2.body.gravity.y = 800
    enemy2.body.velocity.x = -50
    enemy2.body.collideWorldBounds = true
    enemy2.animations.add('left', [10, 11, 12], 10, true)
    enemy2.animations.add('right', [3, 4, 5], 10, true)

     enemy3 = game.add.sprite(-75, 350, 'enemy')
     game.physics.arcade.enable(enemy3)
     enemy3.body.bounce.y = 0.5
     enemy3.body.gravity.y = 800
     enemy3.body.velocity.x = -50
     enemy3.body.collideWorldBounds = true
     enemy3.animations.add('left', [10, 11, 12], 10, true)
     enemy3.animations.add('right', [3, 4, 5], 10, true)

     enemy4 = game.add.sprite(60, 100, 'enemy')
     game.physics.arcade.enable(enemy4)
     enemy4.body.bounce.y = 0.5
     enemy4.body.gravity.y = 800
     enemy4.body.velocity.x = -50
     enemy4.body.collideWorldBounds = true
     enemy4.animations.add('left', [10, 11, 12], 10, true)
     enemy4.animations.add('right', [3, 4, 5], 10, true)

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
    game.physics.arcade.overlap(player, enemy2, collectPigeon, null, this)
    game.physics.arcade.overlap(player, enemy3, collectPigeon, null, this)
    game.physics.arcade.overlap(player, enemy4, collectPigeon, null, this)
    // enemy update
    // enemy.body.velocity.x = -50
    game.physics.arcade.collide(enemy, platforms)
    game.physics.arcade.collide(enemy2, platforms)
    game.physics.arcade.collide(enemy3, platforms)
    game.physics.arcade.collide(enemy4, platforms)
    // bitcoin update
    game.physics.arcade.collide(bitcoins, platforms)
    // game.physics.arcade.collide(enemies, platforms)
    // controls
    if (cursors.left.isDown) {
      player.body.velocity.x = -150
      player.animations.play('left')
      enemy2.body.velocity.x = -50
      enemy2.animations.play('left')
      enemy3.body.velocity.x = -50
      enemy3.animations.play('left')
      enemy4.body.velocity.x = -50
      enemy4.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150
      player.animations.play('right')
      enemy2.body.velocity.x = 50
      enemy2.animations.play('right')
      enemy3.body.velocity.x = 50
      enemy3.animations.play('right')
      enemy4.body.velocity.x = 50
      enemy4.animations.play('right')
    } else {
      player.animations.stop()
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -500
    }
    if (score === 120) {
      alert('You collected all of the bitcoin!')
      endGame()
    }
    if ((Math.floor(enemy.body.x) < 390) && enemy.body.velocity.x === -50) {
      enemy.body.velocity.x = (50)
      // enemy.animations.play('right')
    }
    if ((Math.floor(enemy.body.x) > 700) && enemy.body.velocity.x === 50) {
      enemy.body.velocity.x = (-50)
      // enemy.animations.play('right')
    }
    //face based on velocity
    enemy.body.velocity.x > 0 ? enemy.animations.play('right') : enemy.animations.play('left')
  }

  // scoring
  function collectBitcoin(player, bitcoin) {
    bitcoin.kill()
    collection.play();
    score += 10
    scoreText.text = 'Score: ' + score
  }

  function collectPigeon(player) {
    player.kill()
    over.play();
    score -= 10
    scoreText.text = 'Score: ' + score
    endGame()
  }

  function endGame() {
    scorePost({
      scores: {
        points: score,
        player_id: playerObj.id
      }
    })
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
    div.addEventListener('click', function() {
      while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
      }
      start();
    })
  }
};
