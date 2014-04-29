// here we set the radius of the points 
var radius = new Size(5); // global radius of points

var space = new Point(400,0); // distance between triangles in interactive


// place the vertices of triangle1
var pointA1 = new Point(150, 50);
var pointB1 = new Point(50, 200); 
var pointC1 = new Point(300, 200);


// place the vertices of triangle2
var pointA2 = pointA1 + space; 
var pointB2 = pointB1 + space; 
var pointC2 = pointC1 + space; 


var vectorA1B1 = pointB1-pointA1;
var normalVectorA1B1 = vectorA1B1.normalize();
var orthonormalVectorA1B1 = normalVectorA1B1.rotate(90);

var midA1B1 = (pointA1+pointB1)/2;

var hash1 = new Path({
    segments: [midA1B1-orthonormalVectorA1B1*10, midA1B1+orthonormalVectorA1B1*10],
    strokeColor: 'black'
});

// var circleT1 = new Path.Circle({
//     center: midA1B1,
//     radius: radius,
//     fillColor: 'black'
// });




// draw the solid sides of triangle1
var triangle1 = new Path({
    segments: [pointA1,pointB1,pointC1],
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round' // removes unsightly pointies 
});

// draw the solid sides of triangle2
var triangle2 = new Path({
    segments: [pointA2,pointB2,pointC2],
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round' // removes unsightly pointies 
});

// draw the sides of the farside of triangle1
var farside1 = new Path({
    segments: [pointC1,pointA1],
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round', // removes unsightly pointies 
});
farside1.dashArray = [10,4];

// draw the sides of the farside of triangle2
var farside2 = new Path({
    segments: [pointC2,pointA2],
    strokeColor: 'black',
    strokeWidth: 3,
    strokeJoin: 'round', // removes unsightly pointies 
});
farside2.dashArray = [10,4];

// now we make circles at each vertex
var circleA1 = new Path.Circle({
    center: pointA1, 
    radius: radius,
    fillColor: 'blue'
});

var circleA2 = new Path.Circle({
    center: pointA2, 
    radius: radius,
    fillColor: 'blue'
});

var circleB1 = new Path.Circle({
    center: pointB1, 
    radius: radius,
    fillColor: 'red'
});

var circleB2 = new Path.Circle({
    center: pointB2, 
    radius: radius,
    fillColor: 'red'
});

var circleC1 = new Path.Circle({
    center: pointC1, 
    radius: radius,
    fillColor: 'green'
});

var circleC2 = new Path.Circle({
    center: pointC2, 
    radius: radius,
    fillColor: 'green'
});

// var angle1Leg1 = pointC1 + (pointA1 - pointC1)*.5;
// var angle1Leg2 = pointC1 + (pointB1 - pointC1)*.5;
// var angle1 = new Path.Arc({
//     from: angle1Leg1,
//     through: pointC1,
//     to: angle1Leg2,
//     strokeColor: 'black'
// });

// var circleT1 = new Path.Circle({
//     center: angle1Leg1,
//     radius: radius,
//     fillColor: 'black'
// });


// // making the movable circles pulse
// function onFrame(event) {
//     for (var i = 1; i<6; i++) {
// 	var sinus = Math.sin(event.time * 3 + i);
// 	circleA1.radius=sinus;
// 	}
// }

// for moving the circleA1
circleA1.onMouseDrag = function(event) {
    this.position = event.point;
    //circleT1.position = (event.point + circleB1.position)/2; // swap with mid-hash
    circleA2.position = event.point + space;
    farside1.segments[1].point = event.point;
    farside2.segments[1].point = event.point+space;
    triangle1.segments[0].point = event.point;
    triangle2.segments[0].point = event.point+space;
}

// for moving the circleB1
circleB1.onMouseDrag = function(event) {
    this.position = event.point;
  //  circleT1.position = (event.point + circleA1.position)/2; // swap with mid-hash
    circleB2.position = event.point + space;
    triangle1.segments[1].point = event.point;
    triangle2.segments[1].point = event.point+space;
}

// for moving the circleC1
circleC1.onMouseDrag = function(event) {
    this.position = event.point;
    circleC2.position = event.point + space;
    farside1.segments[0].point = event.point;
    farside2.segments[0].point = event.point+space;
    triangle1.segments[2].point = event.point;
    triangle2.segments[2].point = event.point+space;
}


//////////////////////////////////////////////////////
//function onMouseDrag(event) {
//	pointB.position = event.point;
//}





