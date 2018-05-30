let RatRace = RatRace || {};

RatRace.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

RatRace.game.state.add('Boot', RatRace.Boot);
//uncomment these as we create them through the tutorial
//RatRace.game.state.add('Preload', RatRace.Preload);
//RatRace.game.state.add('MainMenu', RatRace.MainMenu);
//RatRace.game.state.add('Game', RatRace.Game);

RatRace.game.state.start('Boot');
