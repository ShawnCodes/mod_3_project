<<<<<<< HEAD
let RatRace = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

RatRace.state.add('Boot', RatRace.Boot);
//uncomment these as we create them through the tutorial
// RatRace.state.add('Preload', RatRace.Preload);
// RatRace.state.add('MainMenu', RatRace.MainMenu);
RatRace.state.add('Game', RatRace.Game);

RatRace.state.start('Boot');
RatRace.state.start('Game');
=======
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
>>>>>>> 578b67be6b8a604d59935c75199750ff2b1bf498
