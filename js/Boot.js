Busters.Boot = function(){};
Busters.Boot.prototype =
{
	preload: function()
	{
		Busters.game.load.image('titlescreen', 'assets/images/background.png');
		Busters.game.load.image('preloadBar', 'assets/images/button.png');
		Busters.game.load.image('button', 'assets/images/button.png');
	},
	create: function()
	{
		Busters.game.background = Busters.game.add.sprite(0, 0, 'titlescreen');
		// Busters.game.state.start('Level1');
	},
	update: function()
	{

	}
};
