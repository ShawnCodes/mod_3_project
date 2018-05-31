var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),

Main = function () {};

Main.prototype = {

  preload: function () {
    game.load.image('logo', 'assets/bitcoin.png')
    // game.load.script('splash',  'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
