var Busters = Busters || {};
Busters.game = new Phaser.Game(1080, 1920, Phaser.AUTO, 'busters');
Busters.game.state.add('Boot', Busters.Boot);
//game.state.add('Preloader', Game.Preloader);
//game.state.add('MainMenu', Game.MainMenu);
Busters.game.state.add('Level1', Busters.Level1);
Busters.game.state.start('Boot');