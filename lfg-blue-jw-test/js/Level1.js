var Level1 = 
{
	preload: function()
	{
		game.load.image('background', 'assets/images/Level1.png');

 	},
	create: function()
	{

		var score = 0;
		var scoreName;
		var scoreString = '';

		
		console.log("lv.1");
		test = 0;
		background = game.add.sprite(0, 0, 'background');
		//temporary? pause button
		//it's not killed when we pause, just covered. You can still click it to unpause.
		//Intentional. This makes testing easier
		this.createButton("Pause",game.world.centerX*1.65, 100, 300, 100, this.pauseFunct);

		scoreString = 'ScoreTest : ';
		scoreName = game.add.text(10,10, scoreString + score, {font: '40px Arial', fill:'#fff'});
	},
	update: function()
	{
		//we don't actually have a game yet so here's something to pause
		console.log("game up: ", test);
		test++
	},
	//if paused, unpause and remove pause menu
	pauseFunct: function(){
		if(game.paused){
			pauseScreen.kill();
			resumeBtn[0].kill();
			resumeBtn[1].kill();
			menuBtn[0].kill();
			menuBtn[1].kill();
			game.paused = false;
		}//if not paused, pause and make menu
		else{
		console.log("pause: ", test);
		game.paused = true;
		pauseScreen = game.add.sprite(0, 0, 'pause');
		resumeBtn = this.createButton("Resume",game.world.centerX,game.world.centerY+32, 300, 100, this.pauseFunct);
		menuBtn = this.createButton("Menu",game.world.centerX,game.world.centerY+192, 300, 100, function(){game.state.start('MainMenu'); game.paused = false;});
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
	}
};
// Level1.prototype =
// {
	
// };
