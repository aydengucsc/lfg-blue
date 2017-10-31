Preloader = function()
{
}

Preloader.prototype = 
{
	preload: function()
	{
		console.log("preload");
		var preloadBar = this.add.sprite(game.world.centerX,game.world.centerY,'loadbar');
		preloadBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(preloadBar);

		game.load.image('titlescreen', 'assets/images/background.png');
		game.load.image('button', 'assets/images/button.png');
		game.load.image('title', 'assets/images/title.png');
	},
	create: function()
	{
		game.state.start("MainMenu");
	}
}