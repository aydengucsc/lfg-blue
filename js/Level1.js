var Level1 = 
{
	preload: function()
	{
		game.load.image('background', 'assets/images/Level1.png');

 	},
	create: function()
	{
		console.log("lv.1");
		test = 0;
		background = game.add.sprite(0, 0, 'background');
		this.createButton("Pause",game.world.centerX*1.65, 100, 300, 100, this.pauseFunct);
		//var pauseButton = game.add.button(game.world.centerX*1.65, 100,'button',this.pauseFunct,this,2,1,0);
		// pauseButton.anchor.setTo(0.5,0.5);
		// pauseButton.width = 300;
		// pauseButton.height = 100;
	},
	update: function()
	{
		console.log("game up: ", test);
		test++
	},
	pauseFunct: function(){
		if(game.paused){
			pauseScreen.destroy();
			game.paused = false;
		}
		else{
		console.log("pause: ", test);
		game.paused = true;
		pauseScreen = game.add.sprite(0, 0, 'pause');
		this.createButton("Resume",game.world.centerX,game.world.centerY+32, 300, 100, this.pauseFunct);
		this.createButton("Menu",game.world.centerX,game.world.centerY+192, 300, 100, function(){game.state.start('MainMenu'); game.paused = false;});
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
	}
};
// Level1.prototype =
// {
	
// };
