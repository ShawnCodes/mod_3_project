const endScreen = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  text: `Game Over You Scored: `
  // preload: preload,
  // create: create,
  // update: update
})

endScreen.add.text(16, 16, '', {
  fontSize: '32px',
  fill: '#000'
})
