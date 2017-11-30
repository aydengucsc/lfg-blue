var sprite;
var bullets;
var cursors;
var bulletTime = 0;
var bullet;
var lives;

// Enemy constructor
Enemy = function(index, game, x, y) 
{
	enemy = game.add.sprite(x,y,'enemy');
	enemy.scale.setTo(0.2,0.2);
    enemy.anchor.setTo(0.5, 0.5);
	enemy.name = index.toString();
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
	enemy.body.immovable = true;
	enemy.body.collideWorldBounds = true;
};

//Constructor of Level1 Phase
var Level1 = 
{
	
	//Main Functions
	
	preload: function()
	{
		//Level1 assets
		game.load.image('background', 'assets/images/Level1.png');
		game.load.image('triangle', 'assets/images/triangle.png');
		game.load.image('bullet', 'assets/images/bullet.png');
		game.load.image('enemy', 'assets/images/enemy.png');
		game.load.spritesheet('explode', 'assets/images/explode.png', 128, 128);
 	},
	create: function()
	{
		shootSpeedMultiplier = 1;
		moveSpeedMultiplier = 1;
		stateVar = "START";
		score = 0;
		test = 0;
		background = this.game.add.sprite(0, 0, 'background');
		//temporary? pause button
		//it's not killed when we pause, just covered. You can still click it to unpause.
		//Intentional. This makes testing easier
		this.createButton("Pause",game.world.centerX*1.65, 100, 300, 100, this.pauseMenu);
		this.createButton("Dev Mode",game.world.centerX*1.65, 225, 300, 100, this.cheatFunct);

		scoreString = 'Score: ';
		scoreText = game.add.text(10,10, scoreString + score, {font: '40px Arial', fill:'#fff'});
		game.input.keyboard.addCallbacks(this, null, null, this.pressFunct);
		//test text that increments per frame so we can test the pause menu.
		//Feel free to remove when we actually have a game.
		testText = game.add.text(game.world.centerX-465,game.world.centerY-800,"Game up:" + test,{font:"50px Verdana", fill: "#fff"});
		
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

		sprite = game.add.sprite(game.world.centerX, game.world.centerY * 1.8, 'triangle');
		sprite.anchor.setTo(0.5, 0.5);
		sprite.scale.setTo(0.1,0.1);
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.collideWorldBounds = true;

		//FIX THIS
		//Only the rightmost enemy is killable.
		for(var i = -3; i<1; i++){
		new Enemy(0,game,game.world.centerX+ 150*i ,game.world.centerY);
		}
		//lives
	    lives = 1;
	    lifeCounter = game.add.text(70, game.world.height - 75, 'X ' + lives, { font: '60px Arial', fill: '#fff', align: "right"});
		lifeCount = game.add.sprite(0, game.world.height-70, 'triangle');
	        lifeCount.scale.setTo(0.08,0.08);
	        //count.alpha = 0.4;

	    //boom
	    explosions = game.add.group();
	    explosions.createMultiple(200, 'explode');
	    explosions.forEach(this.setupBoom);

		cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	},
	update: function()
	{
		scoreText.text = scoreString + score;
		test++;
		testText.text = "Level Counter: " + test;
		lifeCounter.text = "X " + lives;

		sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;
	    speed = 500 * moveSpeedMultiplier;
	    if (cursors.left.isDown) sprite.body.velocity.x = -speed;
	    if (cursors.right.isDown) sprite.body.velocity.x = speed;
	    if (cursors.up.isDown) sprite.body.velocity.y = -speed;
	    if (cursors.down.isDown) sprite.body.velocity.y = speed;
	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) this.fireBullet();

	    game.physics.arcade.overlap(bullets, enemy, this.collisionHandler, null, this);
	},
	
	//Additional Functions
	collisionHandler: function(shot, victim) {
	//kill both sprites
    shot.kill();
    victim.kill();

    //Increase the score
    score += 200;
    scoreText.text = scoreString + score;

    //explode
    var explosion = explosions.getFirstExists(false);
    explosion.reset(enemy.body.x+50, enemy.body.y+50);
    explosion.play('explode', 30, false, true);
	},
	setupBoom: function(boom) 
	{
		boom.anchor.x = 0.3;
		boom.anchor.y = 0.3;
		boom.animations.add('explode');
	},
	//handles button presses
	pressFunct: function(char)
	{
		if(char == 'p' && stateVar != "CHEAT" && stateVar != "END"){
			this.pauseMenu();
		}
		if(char == 'r' && game.paused){
			game.state.start('Level1');
			game.paused = false;
		}
		if(char == 'c' && game.paused && stateVar!= "END"){
			if (stateVar == "PAUSE")this.pauseMenu();
			this.cheatFunct();
		}
		//debug kill
		if(char == 'k'){
			this.killFunct();
		}
		//cheat: live + 5
		if(char == 'l'){
			lives+=5;
		}
		/*It also captures the entire keyboard if you want to do something with that input
		 *NOTE: Don't use this for game stuff like movement and actions, etc!
		 *This will fire even if the game is paused.
		 *console.log("You pressed: ", char);
		 */
	},
	killFunct: function(){
	    if (lives>-1)
	    {
			var explosion = explosions.getFirstExists(false);
		    explosion.reset(sprite.body.x, sprite.body.y);
		    explosion.play('explode', 30, false, true);
		    lives--;
	    }
	    if (lives < 0){
		    this.gameOver();
		    sprite.visible = false;
	    }
	},
	cheatFunct: function(){
		stateVar = "CHEAT";
		//if game's paused, clean up menu and resume
		if(game.paused){
			this.removeButton(resumeBtn)
			this.removeButton(lifeBtn)
			this.removeButton(dieBtn)
			this.removeButton(speedBtn)
			this.removeButton(slowBtn)
			this.removeButton(shootFastBtn)
			this.removeButton(fasterBtn)
			this.removeButton(fastererBtn)
			this.removeButton(fasterestBtn)
			this.removeButton(scoreBtn)
			this.pauseFunct();
		}//if not paused, pause and make menu
		else{
		//Lots of placeholders to demonstrate possible button placements. 
		//For X, use centerX, X+360, X-360
		//for Y, Add 150 between each button.
		this.pauseFunct("Cheats", 250);
		resumeBtn = this.createButton("Resume",game.world.centerX,game.world.centerY+900,
						 300, 100, this.cheatFunct);

		lifeBtn = this.createButton("More lives?",game.world.centerX+360,game.world.centerY+30,
						 300, 100, function(){lives+=5;});
		dieBtn = this.createButton("Lose lives???",game.world.centerX+360,game.world.centerY+180, 
						300, 100, function(){lives-=5;});
		scoreBtn = this.createButton("Increase score",game.world.centerX+360,game.world.centerY+330, 
						300, 100, function(){score+= 12345;});
		speedBtn = this.createButton("Go fast",game.world.centerX-360,game.world.centerY+30, 
						300, 100, function(){moveSpeedMultiplier = 2;});
		slowBtn = this.createButton("Go slow???",game.world.centerX-360,game.world.centerY+180, 
						300, 100, function(){moveSpeedMultiplier = 0.5;});
		shootFastBtn = this.createButton("Shoot fast",game.world.centerX,game.world.centerY+30, 
						300, 100, function(){shootSpeedMultiplier = 1.5;});
		fasterBtn = this.createButton("Shoot faster",game.world.centerX,game.world.centerY+180, 
						300, 100, function(){shootSpeedMultiplier = 2.5;});
		fastererBtn = this.createButton("Shoot fasterer",game.world.centerX,game.world.centerY+330, 
						300, 100, function(){shootSpeedMultiplier = 6;});
		fasterestBtn = this.createButton("Shoot fasterest",game.world.centerX,game.world.centerY+480, 
						300, 100, function(){shootSpeedMultiplier = -500;});
		}
	},
	//if game's already paused/over, don't unpause it cause you lost
	gameOver: function(){
		stateVar = "END";
		if(game.paused){
			console.log("Game over");
		}//if not paused, pause and make menu
		else{
		this.pauseFunct(" Game\n Over", 250, null, game.world.centerY-900);
		var string = "Score:" + score;
		scoreText = game.add.text(game.world.centerX-this.scaleX(string, 40), game.world.centerY-200,
						 string, {font:"120px Verdana", fill: "#FFF",align:"center"})

		restartBtn = this.createButton("Restart",game.world.centerX,game.world.centerY+292,
						 300, 100, function(){game.state.start('Level1'); game.paused = false;});
		menuBtn = this.createButton("Menu",game.world.centerX,game.world.centerY+132, 300,
						 100, function(){game.state.start('MainMenu'); game.paused = false;});
		}
	},
	//if paused, remove buttons and pause screen
	pauseMenu: function(){
		stateVar = "PAUSE";
		if(game.paused){
			this.removeButton(resumeBtn)
			this.removeButton(menuBtn)
			this.removeButton(restartBtn)
			this.pauseFunct();
		}//if not paused, pause and make menu
		else{
		this.pauseFunct("Paused!", 250);
		resumeBtn = this.createButton("Resume",game.world.centerX+275,game.world.centerY+32,
						 300, 100, this.pauseMenu);
		restartBtn = this.createButton("Restart",game.world.centerX+275,game.world.centerY+192,
						 300, 100, function(){game.state.start('Level1'); game.paused = false;});
		menuBtn = this.createButton("Menu",game.world.centerX-275,game.world.centerY+32,
						 300, 100, function(){game.state.start('MainMenu'); game.paused = false;});
		}
	},
	//if paused, unpause and remove pause screen
	pauseFunct: function(string, fontsize, x, y){
		if(game.paused){
			pauseScreen.kill();
			pauseText.kill();
			stateVar = "RUNNING";
			game.paused = false;
		}//if not paused, pause and make menu
		else{
		console.log(string ,": ", test);
		game.paused = true;

		if (x == undefined)textX = game.world.centerX-475;
			else textX = x;
		if (y == undefined)textY = game.world.centerY-600;
			else textY = y;

		pauseScreen = game.add.sprite(0, 0, 'pause');
		pauseText = game.add.text(textX	,textY,
			string,{font:fontsize+"px Verdana", fill: "#FFF",align:"center"});
		}
	},
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
	        shootDelay = 50 / shootSpeedMultiplier;
	        if (bullet)
	        {
	            bullet.reset(sprite.x-4, sprite.y-60);
	            bullet.body.velocity.y = -1200;
	            bulletTime = game.time.now +shootDelay;
	        }
	    }
	},
	resetBullet : function(bullet) {
		bullet.kill();
	}
};
