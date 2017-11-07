var sprite;
var bullets;
var cursors;
var bulletTime = 0;
var bullet;
var Level1 = 
{
	preload: function()
	{
		//game.load.image('background', 'assets/images/Level1.png');
		//brighter test image so the pause overlay is more obviously transparent
		game.load.image('background', 'assets/images/level1_test.png');
		game.load.image('triangle', 'assets/images/triangle.png');
		game.load.image('bullet', 'assets/images/bullet.png');

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

		scoreString = 'ScoreTest : ';
		scoreName = game.add.text(10,10, scoreString + score, {font: '40px Arial', fill:'#fff'});
		game.input.keyboard.addCallbacks(this, null, null, this.pressFunct);
		//test text that increments per frame so we can test the pause menu.
		//Feel free to remove when we actually have a game.
		testText = game.add.text(game.world.centerX-475,game.world.centerY-400,"Game up:" + test,{font:"100px Verdana", fill: "#F",align:"center"});
		
	 	bullets = game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;

	    for (var i = 0; i < 20; i++)
	    {
	        var b = bullets.create(0, 0, 'bullet');
	        b.name = 'bullet' + i;
	        b.exists = false;
	        b.visible = false;
	        b.checkWorldBounds = true;
	        b.events.onOutOfBounds.add(this.resetBullet, this);
	    }

		sprite = game.add.sprite(game.world.centerX, window.innerHeight * 0.9, 'triangle')
		sprite.scale.setTo(0.1,0.1);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},
	update: function()
	{
		//we don't actually have a game yet so here's something to pause
		//console.log("game up: ", test);
		test++;
		testText.text = "Game up:" + test;
		
		sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;

	    if (cursors.left.isDown)
	    {
	        sprite.body.velocity.x = -300;
	    }
	    if (cursors.right.isDown)
	    {
	        sprite.body.velocity.x = 300;
	    }
	    if (cursors.up.isDown)
	    {
	    	sprite.body.velocity.y = -300;
	    }
	    if (cursors.down.isDown)
	    {
	    	sprite.body.velocity.y = 300;
	    }

	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	    {
	        this.fireBullet();
	    }
	},
	//Press the P button to pause
	pressFunct: function(char){
		if(char === 'p'){
			this.pauseFunct();
		}
		//It also captures the entire keyboard if you want to do something with that input
		//*******NOTE: Don't use this for game stuff like movement and actions, etc!
		//*******This will fire even if the game is paused.
		//console.log("You pressed: ", char);
	},
	//if paused, unpause and remove pause menu
	pauseFunct: function(){
		if(game.paused){
			pauseScreen.kill();
			pauseText.kill();
			this.removeButton(resumeBtn)
			this.removeButton(menuBtn)
			this.removeButton(restartBtn)
			// resumeBtn[0].kill();
			// resumeBtn[1].kill();
			// menuBtn[0].kill();
			// menuBtn[1].kill();
			// restartBtn[0].kill();
			// restartBtn[1].kill();
			
			game.paused = false;
		}//if not paused, pause and make menu
		else{
		console.log("pause: ", test);
		game.paused = true;
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
