Level1 = function(){
};
Level1.prototype =
{
	preload: function()
	{
		game.load.image('background', 'assets/images/Level1.png');
 	},
	create: function()
	{
		console.log("lv.1");
		background = game.add.sprite(0, 0, 'background');
		var pauseButton = game.add.button(game.world.centerX*1.65, 100,'button',this.pauseFunct,this,2,1,0);
		pauseButton.anchor.setTo(0.5,0.5);
		pauseButton.width = 300;
		pauseButton.height = 100;
	},
	update: function()
	{
	},
	pauseFunct: function(){
		console.log("pause");
	},
};
