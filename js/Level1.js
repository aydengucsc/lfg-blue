var sprite;
var bullets;
var cursors;
var bulletTime = 0;
var bullet;
var lives;
var stateText;
var Level1 = 
{
	preload: function()
	{
		game.load.image('background', 'assets/images/Level1.png');
		//brighter test image so the pause overlay is more obviously transparent
		//game.load.image('background', 'assets/images/level1_test.png');
		game.load.image('triangle', 'assets/images/triangle.png');
		game.load.image('bullet', 'assets/images/bullet.png');

		//temporary assets borrowed from phaser examples
		game.load.spritesheet('explode', 'assets/images/explode.png', 128, 128);
 	},
	create: function()
	{

		var score = 0;
		var scoreName;
		var scoreString = '';
		
		console.log("Lv.1");
		test = 0;
		background = game.add.sprite(0, 0, 'background');
		//temporary? pause button
		//it's not killed when we pause, just covered. You can still click it to unpause.
		//Intentional. This makes testing easier
		this.createButton("Pause",game.world.centerX*1.65, 100, 300, 100, this.pauseFunct);
		this.createButton("Cheat!",game.world.centerX*1.65, 225, 300, 100, function(){console.log("Cheating time")});
		// stateText = game.add.text(game.world.centerX-475,game.world.centerY-600,"",{font:"250px Verdana", fill: "#FFF",align:"center"});
		// stateText.visible = false;

		scoreString = 'ScoreTest : ';
		scoreName = game.add.text(10,10, scoreString + score, {font: '40px Arial', fill:'#fff'});
		game.input.keyboard.addCallbacks(this, null, null, this.pressFunct);
		//test text that increments per frame so we can test the pause menu.
		//Feel free to remove when we actually have a game.
		testText = game.add.text(game.world.centerX-475,game.world.centerY-400,"Game up:" + test,{font:"100px Verdana", fill: "#fff"});
		
	 	bullets = game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;

	    for (var i = 0; i < 200; i++)
	    {
	        var b = bullets.create(0, 0, 'bullet');
	        b.name = 'bullet' + i;
	        b.exists = false;
	        b.visible = false;
	        b.checkWorldBounds = true;
	        b.events.onOutOfBounds.add(this.resetBullet, this);
	    }

		sprite = game.add.sprite(game.world.centerX, game.world.centerY * 1.8, 'triangle')
		sprite.scale.setTo(0.1,0.1);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);

		//lives
	    lives = 3;
	    lifeCounter = game.add.text(60, game.world.height - 75, 'X ' + lives, { font: '60px Arial', fill: '#fff' });
		lifeCount = game.add.sprite(5, game.world.height-68, 'triangle');
	        lifeCount.scale.setTo(0.1,0.1);
	        //count.alpha = 0.4;

	    //boom
	    explosions = game.add.group();
	    explosions.createMultiple(200, 'explode');
	    explosions.forEach(this.setupBoom);

		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},
	setupBoom: function(boom) {

    boom.anchor.x = 0.3;
    boom.anchor.y = 0.3;
    boom.animations.add('explode');

	},
	update: function()
	{
		test++;
		testText.text = "Game up:" + test;
		lifeCounter.text = "X " + lives;

		sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;

	    if (cursors.left.isDown) sprite.body.velocity.x = -300;
	    if (cursors.right.isDown) sprite.body.velocity.x = 300;
	    if (cursors.up.isDown) sprite.body.velocity.y = -300;
	    if (cursors.down.isDown) sprite.body.velocity.y = 300;

	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.fireBullet();
	},
	//Press the P button to pause
	pressFunct: function(char){
		if(char === 'p'){
			this.pauseFunct();
		}
		if(char === 'k'){
			this.killFunct();
		}
		if(char === 'r' && game.paused){
			game.state.start('Level1');
			game.paused = false;
		}
		/*It also captures the entire keyboard if you want to do something with that input
		 *NOTE: Don't use this for game stuff like movement and actions, etc!
		 *This will fire even if the game is paused.
		 *console.log("You pressed: ", char);
		 */
	},
	killFunct: function(char){
	    if (lives>0)
	    {
			var explosion = explosions.getFirstExists(false);
		    explosion.reset(sprite.body.x, sprite.body.y);
		    explosion.play('explode', 30, false, true);
		    lives--;
	    }
	    else console.log("Game over");
	},
	//if paused, unpause and remove pause menu
	pauseFunct: function(){
		if(game.paused){
			// stateText.visible = false;
			// pauseScreen.visible = false;
			
			pauseScreen.kill();
			pauseText.kill();
			this.removeButton(resumeBtn)
			this.removeButton(menuBtn)
			this.removeButton(restartBtn)
			
			game.paused = false;
		}//if not paused, pause and make menu
		else{
		console.log("pause: ", test);
		game.paused = true;

		// stateText.text = "Paused!";
		// stateText.visible = true;
		// pauseScreen.visible = true;
		pauseScreen = game.add.sprite(0, 0, 'pause');
		pauseText = game.add.text(game.world.centerX-475,game.world.centerY-600,"Paused!",{font:"250px Verdana", fill: "#FFF",align:"center"});
		resumeBtn = this.createButton("Resume",game.world.centerX+275,game.world.centerY+32, 300, 100, this.pauseFunct);
		restartBtn = this.createButton("Restart",game.world.centerX+275,game.world.centerY+192, 300, 100, function(){game.state.start('Level1'); game.paused = false;});
		menuBtn = this.createButton("Menu",game.world.centerX-275,game.world.centerY+32, 300, 100, function(){game.state.start('MainMenu'); game.paused = false;});
		}
	},
	//aydeng's createButton, modified to return the button&text so we can kill() them later.
	createButton:function(string,x,y,w,h,callback)
	{
		var button1 = game.add.button(x,y,'button',callback,this,2,1,0);
		button1.anchor.setTo(0.5,0.5);
		button1.width = w;
		button1.height = h;
		var txt = game.add.text(button1.x,button1.y,string,{font:"40px Arial", fill: "#0",align:"center"});
		txt.anchor.setTo(0.5,0.5);
		return {"0":button1,"1":txt};
	},
	removeButton:function(object)
	{
		object[0].kill();
		object[1].kill();
	},
	fireBullet: function() {
		if (game.time.now > bulletTime)
	    {
	        bullet = bullets.getFirstExists(false);

	        if (bullet)
	        {
	            bullet.reset(sprite.x + 19, sprite.y - 16);
	            bullet.body.velocity.y = -300;
	            bulletTime = game.time.now + 150;
	        }
	    }
	},
	resetBullet : function(bullet) {
		bullet.kill();
	}
};
// Level1.prototype =
// {
	
// };
