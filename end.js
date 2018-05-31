// const endScreen = new Phaser.Game(800, 600, Phaser.AUTO, '', {
//   text: `Game Over You Scored: `
//   // preload: preload,
//   // create: create,
//   // update: update
// })
const div = document.getElementById('overlay')
const h2 = document.createElement('h2')
h2.innerText = "Game Over"
const para = document.createElement('p')
para.innerText = `Your score is ${score}`

div.append(h2)
div.append(para)

// endScreen.add.text(16, 16, '', {
//   fontSize: '32px',
//   fill: '#000'
// })
