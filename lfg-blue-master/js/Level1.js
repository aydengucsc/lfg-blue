Level1 = function(){};
Level1.prototype =
{
	preload: function()
	{
		game.load.image('background', 'assets/images/background.png');
 	},

 	//var score = 0;
	//var scoreName = '';
	//var scoreText;
	create: function()
	{
		console.log("lv.1");
		game.background = game.add.sprite(0, 0, 'background');
		//scoreName = 'Score : ';
		//scoreText = game.add.text(10, 10, scoreName + score, { font: '34px Arial', fill: '#fff' });
	},
	update: function()
	{

	}
};
