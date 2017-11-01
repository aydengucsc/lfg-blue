
Boot = function(){};
Boot.prototype =
{
	preload: function()
	{
		game.load.image('titlescreen', 'assets/images/background.png');
		game.load.image('preloadBar', 'assets/images/button.png');
		game.load.image('button', 'assets/images/button.png');
	},
	
	create: function()
	{
		console.log("boot");
		game.background = game.add.sprite(0, 0, 'titlescreen');
		game.state.start('MainMenu');
		
	},
	update: function()
	{

	}
};