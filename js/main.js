var GameState = 
{
		preload: function()
		{
			this.load.image('titlescreen', 'assets/images/background.png');
			this.load.image('button', 'assets/images/button.png');
		},
		create: function()
		{
			this.state.start('MainMenu');
		},
		update: function()
		{
			
		}
};

var game = new Phaser.Game(1080, 1920, Phaser.AUTO);