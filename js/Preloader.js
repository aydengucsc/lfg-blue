var Preloader = {
	preload: function()
	{
		console.log("preload");
		var preloadBar = this.add.sprite(game.world.centerX,game.world.centerY,'loadbar');
		preloadBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(preloadBar);

		game.load.image('titlescreen', 'assets/images/background.png');
		game.load.spritesheet('button', 'assets/images/flixel-button.png', 80, 20);
		game.load.image('title', 'assets/images/title.png');
		game.load.image('pause', 'assets/images/pause.png');

		//----------stuff moved over from Level1.js----------------
		game.load.image('background', 'assets/images/Level1.png');
		game.load.image('triangle', 'assets/images/triangle.png');
		game.load.image('bullet', 'assets/images/bullet.png');

		//temporary assets borrowed from phaser examples
		game.load.spritesheet('explode', 'assets/images/explode.png', 128, 128);
		
	},
	create: function()
	{
		//game.state.start("MainMenu");
		//Boot right into lv.1 because I'm getting tired of menuing
		game.state.start("Level1");
	}
}

// Preloader.prototype = 
// {
	
// }