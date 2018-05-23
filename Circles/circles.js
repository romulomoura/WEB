
var ctx;
var canvas;
var shapes;
var mouseDown;

var colors = 
[
	"AliceBlue","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
	"Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue",
	"Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen",
	"DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen",
	"DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray",
	"DimGrey","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gainsboro","Gold","GoldenRod",
	"Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Khaki","Lavender","LavenderBlush",
	"LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen",
	"LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","Lime",
	"LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue",
	"MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MistyRose","Moccasin","Navy",
	"Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff",
	"Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna",
	"Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet",
	"Wheat","Yellow","YellowGreen"
];

function init()
{
	// Full screen canvas
	canvas = document.getElementById('canvas');	
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	window.onresize = function() 
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};	
		
	// Graphic context to draw in the canvas
	ctx = canvas.getContext('2d');

	// Contains all shapes to be drawn
	shapes = [];
	
	// Seting up mouse events
	mouseDown = false;
	
	canvas.addEventListener('mousedown', function(e)
	{
		mouseDown = true;
		explosion(e);
	});
	
	window.addEventListener('mouseup', function(e) {
		mouseDown = false;		
	});
	
	canvas.addEventListener('mousemove', function(e) 
	{
		if (mouseDown) {
			explosion(e);
		}
	});
		
	// Processing Loop
	var timer = setInterval(function()
	{		
	    // update all shapes' size and position
		for (var i = shapes.length -1; i >=0; --i)
		{
			if (!shapes[i].update()) {
				shapes.splice(i, 1); // if the shape is dead then remove it from the list
			}
		}
		
		// clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// repaint all remaining shapes
		shapes.forEach(function(shape) {
			paint(shape);	
		});		
	}, 
	100);	
}

// Add new shapes to the drawing list
function explosion(e)
{
	for (var i = 0; i < 200; ++i) {
		shapes.push(new Shape(e.clientX, e.clientY));
	}	
}

// Represents one single shape in the screen
function Shape(x, y)
{	
    // generates a random position 3px arround the mouse cursor 
	this.x = random(-3,3) + x;
	this.y = random(-3,3) + y;
	
	// choose a random color
	this.color = colors[Math.floor((Math.random() * colors.length))];
	
	// size and maximum size of the shape
	this.size = 1;	
	this.maxSize = random(2,6);
	
	// the direction in which the shape will move (any angle between 0 and 360 degrees)
	this.angle = random(0, Math.PI * 2);
	
	// first, each shape will grow to its maximun size and then begin to decrease its size 
	// until it desappears
	this.isGrowing = true;
		
	this.update = function()
	{				
		if (changeSize(this)) 
		{
			changePosition(this);
			return true;
		}

		// it means the shape desappeared
		return false;
	};
}

function changeSize(shape)
{	
	// increase the size if the shape is in the growth fase
	if (shape.isGrowing)
	{
		if (shape.size < shape.maxSize) {
			shape.size += random(0,8); // the growth rate is biger then the	decrease rate	
		}
		else {
			shape.isGrowing = false; // maximun size reached, start the decrease fase
		}
	}
	// descrease the size otherwise
	else
	{		
		shape.size -= random(0,1);
		
		if (shape.size <= 0) {
			return false; // the shape died!
		}
	}
	
	return true; // the share remains
}

function changePosition(shape)
{
	// the amount of pixels the shape will be moved
	// this quantity is high in the growth fase to simulate an explosion
	// after that, the shape moves slower
	var d = Math.random() * (shape.isGrowing ? 60 : 15);
	
	// a variation in the original angle (in this case +/- 50 degrees) will
	// simulate the turbulence of the movement
	var angle = 50 *  Math.PI / 180; // converting to radians
		
	angle = random(-angle,angle) + shape.angle;
	
	// changes the position by adding the displacement on each axis
	shape.x += d * Math.cos(angle);
	shape.y += d * Math.sin(angle);
}

// just paint the shape using the graphics context
function paint(shape)
{
	ctx.fillStyle = shape.color;	
	drawCircle(shape);	
};

// generates a random number in the given range
function random(start,end) {
	return Math.random() * Math.abs(end-start) + start;
}

function drawCircle(shape)
{
	ctx.beginPath();
	ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
	ctx.fill();
}
