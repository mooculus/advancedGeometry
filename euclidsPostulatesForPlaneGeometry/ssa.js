// place the vertices of triangle1
var pointA1 = new Point(50, 200); 
var pointB1 = new Point(300, 200);
var pointC1 = new Point(150, 50);
var space = new Point(400,0);

// place the vertices of triangle2
var pointA2 = pointA1 + space; 
var pointB2 = pointB1 + space; 
var pointC2 = pointC1 + space; 

// draw the sides of triangle1
var triangle1 = new Path();
triangle1.add(pointA1); 
triangle1.add(pointB1); 
triangle1.add(pointC1);
triangle1.closed = true;
triangle1.style = {
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round' // removes unsightly pointies 
};

// draw the sides of triangle2
var triangle2 = new Path();
triangle2.add(pointA2); 
triangle2.add(pointB2); 
triangle2.add(pointC2);
triangle2.closed = true;
triangle2.style = {
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round' // removes unsightly pointies 
};

// here we set the diameter of the points 
var diameter = new Size(5);

// now we make circles at each vertex
var circleA1 = new Path.Circle(pointA1, diameter);
circleA1.fillColor = 'blue';

var circleA2 = new Path.Circle(pointA2, diameter);
circleA2.fillColor = 'blue';

var circleB1 = new Path.Circle(pointB1, diameter);
circleB1.fillColor = 'red';

var circleB2 = new Path.Circle(pointB2, diameter);
circleB2.fillColor = 'red';

var circleC1 = new Path.Circle(pointC1, diameter);
circleC1.fillColor = 'green';

var circleC2 = new Path.Circle(pointC2, diameter);
circleC2.fillColor = 'green';

// for moving the circleA1
circleA1.onMouseDrag = function(event) {
    this.position = event.point;
    circleA2.position=event.point+space;
    triangle1.segments[0].point = event.point;
    triangle2.segments[0].point = event.point+space;
}

// for moving the circleB1
circleB1.onMouseDrag = function(event) {
    this.position = event.point;
    circleB2.position=event.point+space;
    triangle1.segments[1].point = event.point;
    triangle2.segments[1].point = event.point+space;
}

// for moving the circleC1
circleC1.onMouseDrag = function(event) {
    this.position = event.point;
    circleC2.position=event.point+space;
    triangle1.segments[2].point = event.point;
    triangle2.segments[2].point = event.point+space;
}



//function onMouseDrag(event) {
//	pointB.position = event.point;
//}







var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

var pointA = new Path.Circle(new Point(50, 200), 5);
pointA.fillColor = 'blue'

var pointB = new Path.Circle(new Point(300, 200), 5);
pointB.fillColor = 'red'

var pointC = new Path.Circle(new Point(150, 50), 5);
pointC.fillColor = 'green'


var path = new Path();
path.strokeColor = 'black';
path.add.pointA; 
path.add.pointB; 
path.add.pointC;
path.closed = true;




function onMouseDrag(event) {
    if (path.contains(event.point)) {
        path.position = event.point;
    }
}






// EXAMPLE


var hitOptions = { segments: true, stroke: true, fill: true, tolerance: 3 };


//create a rectangle
var rectangle = new paper.Rectangle(new paper.Point(200, 200), new paper.Size(100, 100)); //or (top_left, bottom_right)
var cornerSize = new paper.Size(15, 15); //rounding of edges
var shape = new paper.Path.RoundRectangle(rectangle, cornerSize);
shape.strokeWidth = 3;
shape.strokeColor = '#525252';
shape.fillColor = '#FF6600';
shape.name = 'shape'
paper.view.draw();
tool = new paper.Tool(); //Create a simple drawing tool:
var obj
tool.onMouseDown = function(event) //Define a mousedown and mousedrag handler
{
obj = null;
var hitResult = paper.project.hitTest(event.point, hitOptions);


if (hitResult && hitResult.type == 'fill') //state fill
obj = hitResult.item;
}
tool.onMouseMove = function(event) 
{
var hitResult = paper.project.hitTest(event.point, hitOptions);
paper.project.activeLayer.selected = false;
if (hitResult && hitResult.item)
hitResult.item.selected = true; 
}
tool.onMouseDrag = function(event) 
{
if (obj) 
obj.position = event.point; 
}
tool.onMouseUp = function(event) 
{
}

// END EXAMPLE



var segment, path;
var movePath = false;
function onMouseDown(event) {
	segment = path = null;
	var hitResult = project.hitTest(event.point, hitOptions);
	if (!hitResult)
		return;

	if (event.modifiers.shift) {
		if (hitResult.type == 'segment') {
			hitResult.segment.remove();
		};
		return;
	}

	if (hitResult) {
		path = hitResult.item;
		if (hitResult.type == 'segment') {
			segment = hitResult.segment;
		} else if (hitResult.type == 'stroke') {
			var location = hitResult.location;
			segment = path.insert(location.index + 1, event.point);
			path.smooth();
		}
	}
	movePath = hitResult.type == 'fill';
	if (movePath)
		project.activeLayer.addChild(hitResult.item);
}

function onMouseMove(event) {
	project.activeLayer.selected = false;
	if (event.item)
		event.item.selected = true;
}

function onMouseDrag(event) {
	if (segment) {
		segment.point += event.delta;
		path.smooth();
	} else if (path) {
		path.position += event.delta;
	}
}


