Busters.Level1 = function(){};
Busters.Level1.prototype =
{
	preload: function()
	{
		Busters.game.load.image('background', 'assets/images/background.png');
 	},
	create: function()
	{
		Busters.game.background = Busters.game.add.sprite(0, 0, 'background');
	},
	update: function()
	{

	}
};
