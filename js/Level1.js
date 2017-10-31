Level1 = function(){};
Level1.prototype =
{
	preload: function()
	{
		game.load.image('background', 'assets/images/background.png');
 	},
	create: function()
	{
		console.log("lv.1");
		game.background = game.add.sprite(0, 0, 'background');
	},
	update: function()
	{

	}
};
