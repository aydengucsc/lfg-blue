var Preloader = {
	preload: function()
	{
		var preloadBar = this.add.sprite(game.world.centerX,game.world.centerY,'loadbar');
		preloadBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(preloadBar);

		game.load.image('titlescreen', 'assets/images/background.png');
		game.load.spritesheet('button', 'assets/images/flixel-button.png', 80, 20);
		game.load.image('title', 'assets/images/title.png');
		game.load.image('pause', 'assets/images/pause.png');

		//Level1 assets
		game.load.image('background', 'assets/images/Level1.png');
		game.load.image('triangle', 'assets/images/triangle.png');
		game.load.image('bullet', 'assets/images/bullet.png');
		game.load.image('enemy', 'assets/images/enemy.png');
		//temporary assets borrowed from phaser examples
		game.load.spritesheet('explode', 'assets/images/explode.png', 128, 128);
	},
	create: function()
	{
		game.state.start("Level1");
	}
}
