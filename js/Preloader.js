Game.Preloader = function(game)
{
		this.preloadBar = null;
}

Game.Preload.prototype = 
{
	preload: function()
	{
		this.reloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);
	},
	create: function()
	{
		this.game.state.start("Level1");
	}
}