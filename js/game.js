// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

//imagen de la piedra
var piedraReady = false;
var piedraImage = new Image();
piedraImage.onload = function() {
    piedraReady = true;
};
piedraImage.src = "images/stone.png";

//imagen de la piedra2
var piedraReady2 = false;
var piedraImage2 = new Image();
piedraImage2.onload = function() {
    piedraReady2 = true;
};
piedraImage2.src = "images/stone.png";

//imagen de la piedra3
var piedraReady3 = false;
var piedraImage3 = new Image();
piedraImage3.onload = function() {
    piedraReady3 = true;
};
piedraImage3.src = "images/stone.png";

//imagen del monstruo
var monstruoReady = false;
var monstruoImage = new Image();
monstruoImage.onload = function() {
    monstruoReady = true;
};
monstruoImage.src = "images/monster.png";

//imagen del monstruo2
var monstruoReady2 = false;
var monstruoImage2 = new Image();
monstruoImage2.onload = function() {
    monstruoReady2 = true;
};
monstruoImage2.src = "images/monster.png";

//Globales
var princessesCaught = 0;
var numLevel = 1;

// Game objects

//objeto heroe
var hero = {
	speed: 256 // movement in pixels per second
};

//objeto monstruo
var monstruo = {
    speed : 100,
}

//objeto monstruo
var monstruo2 = {
    speed : 200,
}

//objeto princesa
var princess = {};

//objeto piedra
var piedra = {};

var piedra2 = {};

var piedra3 = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a princess
var reset = function () {

    //colocamos al empezar al heroe
	hero.x = canvas.width / 2;  //crea al vuelo hero.x y hero.y
	hero.y = canvas.height / 2;


	// Throw the princess somewhere on the screen randomly
	var xprin;
	var yprin;
	
	for(;;){
	     xprin = 32 + (Math.random() * (canvas.width - 64));
	     if (xprin > 29 && xprin < 451){
	        break;
        } 
	}
	
	for(;;){
	     yprin = 32 + (Math.random() * (canvas.height - 64));
	     if (yprin > 32 && yprin < 414){
	        break;
        } 
	}
	
	princess.x = xprin;
	princess.y = yprin;
	
	
	//colocamos la piedra aleatoriamente al empezar, donde no este la princesa ni el heroe.
	colocarPiedra(piedra);
	if (numLevel === 2){
        colocarPiedra(piedra2);
	    colocarPiedra(piedra3);
	}
	
	//Colocamos al monstruo
	colocarMonstruo(monstruo);
	if (numLevel === 2){
        colocarMonstruo(monstruo2);
	}
	
};

var colocarPiedra = function(piedra){
    var x;
	var y;
	
	for(;;){
	     x = 32 + (Math.random() * (canvas.width - 64));
	     if (x > 63 && x < 417){
	        break;
        } 
	}
	
	for(;;){
	     y = 32 + (Math.random() * (canvas.height - 64));
	     if (y > 66 && y < 380){
	        break;
        } 
	}
	
	if ((x === hero.x) || (x === princess.x) || (x - hero.x < 34 && x - hero.x > 0) || (x - princess.x < 34 && x - princess.x > 0)){
	    piedra.x = x+34;
	}else if((hero.x - x < 34 && hero.x - x > 0) || (princess.x - x < 34 && princess.x - x > 0)){
	    piedra.x = x-34;
	}else{
	    piedra.x = x;
	}
	
	if ((y === hero.y) || (y === princess.y) || (y - hero.y < 34 && y - hero.y > 0) || (y - princess.y < 34 && y - princess.y > 0)){
	    piedra.y = y+34;
	}else if((hero.y - y < 34 && hero.y - y > 0) || (princess.y - y < 34 && princess.y - y > 0)){
	    piedra.y = y-34;
    }else{
	    piedra.y = y;
	}
};

var colocarMonstruo = function (monstruo) {
    var xmonster;
	var ymonster;
	
	for(;;){
	     xmonster = 32 + (Math.random() * (canvas.width - 64));
	     if (xmonster > 63 && xmonster < 417){
	        break;
        } 
	}
	
	for(;;){
	     ymonster = 32 + (Math.random() * (canvas.height - 64));
	     if (ymonster > 66 && ymonster < 380){
	        break;
        } 
	}
	
	if ((xmonster === hero.x) || (xmonster === princess.x) || (xmonster === piedra.x) || (xmonster - hero.x < 34 && xmonster - hero.x > 0) || 
	    (xmonster - princess.x < 34 && xmonster - princess.x > 0) || (xmonster - piedra.x < 34 && xmonster - piedra.x > 0)){
	    
	    monstruo.x = xmonster+34;
	}else if((hero.x - xmonster < 34 && hero.x - xmonster > 0) || (princess.x - xmonster < 34 && princess.x - xmonster > 0) ||
	        (piedra.x - xmonster < 34 && piedra.x - xmonster > 0)){
	    monstruo.x = xmonster-34;
	}else{
	    monstruo.x = xmonster;
	}
	
	if ((ymonster === hero.y) || (ymonster === princess.y) || (xmonster === piedra.x) || (ymonster - hero.y < 34 && ymonster - hero.y > 0) ||
	    (ymonster - princess.y < 34 && ymonster - princess.y > 0) || (xmonster - piedra.x < 34 && xmonster - piedra.x > 0)){
	    monstruo.y = ymonster+34;
	}else if((hero.y - ymonster < 34 && hero.y - ymonster > 0) || (princess.y - ymonster < 34 && princess.y - ymonster > 0) || 
	        (piedra.x - xmonster < 34 && piedra.x - xmonster > 0)){
	    monstruo.y = ymonster-34;
    }else{
	    monstruo.y = ymonster;
	}

};

// Update game objects
var update = function (modifier) {
    
	if (38 in keysDown) { // Player holding up
	
		var y = hero.y - hero.speed * modifier;
	    if (y < 32){
	        hero.y = 32;	        
	    }else if (hero.x <= (piedra.x + 34) && piedra.x <= (hero.x + 34) && y <= (piedra.y + 34) && piedra.y <= (y + 34)) {	 
	        hero.y = hero.y; 
        }else if (hero.x <= (piedra2.x + 34) && piedra2.x <= (hero.x + 34) && y <= (piedra2.y + 34) && piedra2.y <= (y + 34)) {	 
	        hero.y = hero.y; 
        }else if (hero.x <= (piedra3.x + 34) && piedra3.x <= (hero.x + 34) && y <= (piedra3.y + 34) && piedra3.y <= (y + 34)) {	 
	        hero.y = hero.y;             
	    }else{
	        hero.y = y;
	    }
		//console.log("HERO_y_Arriba despues: " + hero.y);
	}
	if (40 in keysDown) { // Player holding down   
	 
		var y = hero.y + hero.speed * modifier;
	    if (y > 414){
	        hero.y = 414;	
        }else if (hero.x <= (piedra.x + 34) && piedra.x <= (hero.x + 34) && y <= (piedra.y + 34) && piedra.y <= (y + 34)) {	 
	        hero.y = hero.y;       
        }else if (hero.x <= (piedra2.x + 34) && piedra2.x <= (hero.x + 34) && y <= (piedra2.y + 34) && piedra2.y <= (y + 34)) {	 
	        hero.y = hero.y;
        }else if (hero.x <= (piedra3.x + 34) && piedra3.x <= (hero.x + 34) && y <= (piedra3.y + 34) && piedra3.y <= (y + 34)) {	 
	        hero.y = hero.y; 
	    }else{
	        hero.y = y;
	    }
	    //console.log("HERO_y_Debajo despues: " + hero.y);
	}
	if (37 in keysDown) { // Player holding left
	
		var x = hero.x - hero.speed * modifier;
		if (x < 29){
	        hero.x = 29;
        }else if (x <= (piedra.x + 34) && piedra.x <= (x + 34) && hero.y <= (piedra.y + 34) && piedra.y <= (hero.y + 34)) {	 
	        hero.x = hero.x; 
        }else if (x <= (piedra2.x + 34) && piedra2.x <= (x + 34) && hero.y <= (piedra2.y + 34) && piedra2.y <= (hero.y + 34)) {	 
	        hero.x = hero.x;
        }else if (x <= (piedra3.x + 34) && piedra3.x <= (x + 34) && hero.y <= (piedra3.y + 34) && piedra3.y <= (hero.y + 34)) {	 
	        hero.x = hero.x; 
	    }else{
	        hero.x = x;
	    }
		//console.log("HERO_x_Izquierda despues: " + hero.x);
	}
	if (39 in keysDown) { // Player holding right
	
	    var x = hero.x + hero.speed * modifier;
	    if (x > 451){
	        hero.x = 451; 
        }else if (x <= (piedra.x + 34) && piedra.x <= (x + 34) && hero.y <= (piedra.y + 34) && piedra.y <= (hero.y + 34)) {	 
	        hero.x = hero.x; 
        }else if (x <= (piedra2.x + 34) && piedra2.x <= (x + 34) && hero.y <= (piedra2.y + 34) && piedra2.y <= (hero.y + 34)) {	 
	        hero.x = hero.x;
        }else if (x <= (piedra3.x + 34) && piedra3.x <= (x + 34) && hero.y <= (piedra3.y + 34) && piedra3.y <= (hero.y + 34)) {	 
	        hero.x = hero.x; 
	    }else{
	        hero.x = x;
	    }
	    //console.log("HERO_x_Derecha despues: " + hero.x);		
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		if (numLevel === 1 && princessesCaught === 10){
		    alert("Subes al NIVEL 2");
		    numLevel = 2;
		    princessesCaught = 0;
		}
		reset();
	}	
};

var tope = false;
var moverMonster = function (modifier) {
        
    if (!tope){
        var y = monstruo.y - monstruo.speed * modifier;
        if (y < 32){
            tope = true;	
        }else{
            monstruo.y = y;
        }
    }else{
        var y = monstruo.y + monstruo.speed * modifier;
        if (y > 414){
            tope = false;	
        }else{
            monstruo.y = y;
        }       
    }   
    if (
		hero.x <= (monstruo.x + 32)
		&& monstruo.x <= (hero.x + 32)
		&& hero.y <= (monstruo.y + 32)
		&& monstruo.y <= (hero.y + 32)
	) {
	    princessesCaught = 0;
	    alert("Te ha cogido el monstruo");
		reset();
	}
};

var tope2 = false;
var moverMonster2 = function (modifier) {
        
    if (!tope2){
        var x = monstruo2.x - monstruo2.speed * modifier;
        if (x < 29){
            tope2 = true;	
        }else{
            monstruo2.x = x;
        }
    }else{
        var x = monstruo2.x + monstruo2.speed * modifier;
        if (x > 451){
            tope2 = false;	
        }else{
            monstruo2.x = x;
        }       
    }   
    if (
		hero.x <= (monstruo2.x + 32)
		&& monstruo2.x <= (hero.x + 32)
		&& hero.y <= (monstruo2.y + 32)
		&& monstruo2.y <= (hero.y + 32)
	) {
	    princessesCaught = 0;
	    alert("Te ha cogido el monstruo");
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
	
	if (piedraReady){
	    ctx.drawImage(piedraImage, piedra.x, piedra.y);
	}	
	
	if (monstruoReady){
	    ctx.drawImage(monstruoImage, monstruo.x, monstruo.y);
	}
	
	if (numLevel === 2){
	    if (piedraReady2){
	        ctx.drawImage(piedraImage2, piedra2.x, piedra2.y);
	    }
	    
	    if (piedraReady3){
	        ctx.drawImage(piedraImage3, piedra3.x, piedra3.y);
	    }	
	    
	    if (monstruoReady2){
	        ctx.drawImage(monstruoImage2, monstruo2.x, monstruo2.y);
	    }
	}
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	moverMonster(delta / 1000);
	if (numLevel === 2){
	    moverMonster2(delta / 1000);
	}
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
