MainMenu = function(game)
{
	
};
//Why do we need this var?
//var titlescreen;

MainMenu.prototype = 
{
	create:function(game)
	{
		console.log("menu");
		game.background = game.add.sprite(0, 0, 'titlescreen');
		this.createButton("Start Game",game.world.centerX,game.world.centerY+32, 300, 100, function(){this.state.start('Level1')});
		this.createButton("About",game.world.centerX,game.world.centerY+192, 300, 100, function(){console.log("about")});
	
		// titlescreen = game.add.sprite(game.world.centerX,game.world.centerY-192,'titlescreen');
		// titlescreen.anchor.setTo(0.5,0.5);
	},
	update:function(game)
	{
		
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