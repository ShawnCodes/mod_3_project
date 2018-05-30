let RatRace = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

RatRace.state.add('Boot', RatRace.Boot);
//uncomment these as we create them through the tutorial
// RatRace.state.add('Preload', RatRace.Preload);
// RatRace.state.add('MainMenu', RatRace.MainMenu);
RatRace.state.add('Game', RatRace.Game);

RatRace.state.start('Boot');
RatRace.state.start('Game');
