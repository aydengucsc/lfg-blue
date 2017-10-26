var Game = {};
Game.boot = function(game){};
Game.Boot.prototype =
{
	init: function()
	{
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	}
	preload: function()
	{
		this.load.image('titlescreen', 'assets/images/background.png');
		this.load.image('preloadBar', 'assets/images/button.png');
		this.load.image('button', 'assets/images/button.png');
	},
	create: function()
	{
		this.state.start('Preloader');
	},
	update: function()
	{
		
	}
};