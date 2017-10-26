var Busters = window.Busters || (window.Busters = {});
Busters.Boot = function(){};
Busters.Boot.prototype =
{
	preload: function()
	{
		this.load.image('titlescreen', 'assets/images/background.png');
		this.load.image('preloadBar', 'assets/images/button.png');
		this.load.image('button', 'assets/images/button.png');
	},
	create: function()
	{
		this.state.start('Level1');
	},
	update: function()
	{
		
	}
};