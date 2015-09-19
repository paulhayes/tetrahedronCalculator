tetraCoords = require('./tetrahedronCalculator');

var lengths = process.argv.slice(2);
console.log("testing tetrahedron "+lengths.join(','));
var verts = tetraCoords(lengths);
var calculatedLengths = tetraCoords.edges.map(function(edge){ 
	return tetraCoords.indexesToValues(edge,verts) 
}).map(function(verts){ 
	return tetraCoords.Vector.distance(verts[0],verts[1]);
});

lengths.forEach(function(length,i){
	console.log("triangle length ",length,calculatedLengths[i]);
});

console.log(verts);

var Vector = tetraCoords.Vector;

/*
console.log( Vector.projectOntoPlane(new Vector(3,0,0),new Vector(1,0,0),new Vector(0,0,0)) );
console.log( Vector.projectOntoPlane(new Vector(3,0,0),new Vector(0,1,0),new Vector(6,0,0)) );
console.log( Vector.projectOntoPlane(new Vector(3,0,0),new Vector(0,0,1),new Vector(6,0,0)) );
*/