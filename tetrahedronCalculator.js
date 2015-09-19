var tetraCoords = function(){

	/*
		The following is a simple Vector 3 library from
		http://evanw.github.io/lightgl.js/docs/vector.html
	*/

	var Vector = function(x, y, z) {
	  this.x = x || 0;
	  this.y = y || 0;
	  this.z = z || 0;
	}

	Vector.prototype = {
	  negative: function() {
	    return new Vector(-this.x, -this.y, -this.z);
	  },
	  add: function(v) {
	    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
	    else return new Vector(this.x + v, this.y + v, this.z + v);
	  },
	  subtract: function(v) {
	    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
	    else return new Vector(this.x - v, this.y - v, this.z - v);
	  },
	  multiply: function(v) {
	    if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
	    else return new Vector(this.x * v, this.y * v, this.z * v);
	  },
	  divide: function(v) {
	    if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
	    else return new Vector(this.x / v, this.y / v, this.z / v);
	  },
	  equals: function(v) {
	    return this.x == v.x && this.y == v.y && this.z == v.z;
	  },
	  dot: function(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	  },
	  cross: function(v) {
	    return new Vector(
	      this.y * v.z - this.z * v.y,
	      this.z * v.x - this.x * v.z,
	      this.x * v.y - this.y * v.x
	    );
	  },
	  length: function() {
	    return Math.sqrt(this.dot(this));
	  },
	  unit: function() {
	    return this.divide(this.length());
	  },
	  min: function() {
	    return Math.min(Math.min(this.x, this.y), this.z);
	  },
	  max: function() {
	    return Math.max(Math.max(this.x, this.y), this.z);
	  },
	  toAngles: function() {
	    return {
	      theta: Math.atan2(this.z, this.x),
	      phi: Math.asin(this.y / this.length())
	    };
	  },
	  angleTo: function(a) {
	    return Math.acos(this.dot(a) / (this.length() * a.length()));
	  },
	  toArray: function(n) {
	    return [this.x, this.y, this.z].slice(0, n || 3);
	  },
	  clone: function() {
	    return new Vector(this.x, this.y, this.z);
	  },
	  init: function(x, y, z) {
	    this.x = x; this.y = y; this.z = z;
	    return this;
	  }
	};

	Vector.negative = function(a, b) {
	  b.x = -a.x; b.y = -a.y; b.z = -a.z;
	  return b;
	};

	Vector.add = function(a, b, c) {
	  if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
	  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
	  return c;
	};
	Vector.subtract = function(a, b, c) {
	  if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
	  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
	  return c;
	};
	Vector.multiply = function(a, b, c) {
	  if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
	  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
	  return c;
	};
	Vector.divide = function(a, b, c) {
	  if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
	  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
	  return c;
	};
	Vector.cross = function(a, b, c) {
	  c.x = a.y * b.z - a.z * b.y;
	  c.y = a.z * b.x - a.x * b.z;
	  c.z = a.x * b.y - a.y * b.x;
	  return c;
	};
	Vector.unit = function(a, b) {
	  var length = a.length();
	  b.x = a.x / length;
	  b.y = a.y / length;
	  b.z = a.z / length;
	  return b;
	};
	Vector.fromAngles = function(theta, phi) {
	  return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
	};
	Vector.randomDirection = function() {
	  return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
	};
	Vector.min = function(a, b) {
	  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
	};
	Vector.max = function(a, b) {
	  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
	};
	Vector.lerp = function(a, b, fraction) {
	  return b.subtract(a).multiply(fraction).add(a);
	};
	Vector.fromArray = function(a) {
	  return new Vector(a[0], a[1], a[2]);
	};
	Vector.angleBetween = function(a, b) {
	  return a.angleTo(b);
	};

	/* 
		End of Vector library
	*/

	/*
		edges defined by vetex indexes
	*/
	var edges = [
		[1,2],
		[2,0],
		[0,1],
		[1,3],
		[2,3],
		[0,3]
	];


	/*
		triangles defined by edge indexes
	*/
	var triangles = [
		[0,1,2],
		[0,3,4],
		[1,4,5],
		[2,5,3]
	];

	var triangleVertexes = [
		[0,1,2],
		[3,2,1],
		[3,0,2],
		[3,1,0]
	];

	tetraCoords.triangles = triangles;
	tetraCoords.edges = edges;
	tetraCoords.Vector = Vector;

	/* I want to see what this Vector looks like */
	Vector.prototype.toString = function(){
		return [this.x,this.y,this.z].join(',');
	}

	/* Syntactic sugar to for calcualting distance */
	Vector.distance = function(a,b){
		return b.subtract(a).length();
	}

	/*
		Project Vector point onto plane given it's normal and origin
		a:Vector point to project
		b:Vector plane normal
		c:Vector plane origin

		returns the closest point on the plane to the point
	*/
	Vector.projectOntoPlane = function(a,b,c){
		b = b.unit();
		var dot = c.subtract(a).dot(b.negative());
		return a.add( b.negative().multiply( dot ) );
	}

	Vector.project = function(a,b){
		return b.multiply( a.dot( b.unit() ) );
	}

	var checkTriangle = function(){
		for(var i=0;i<3;i++){
			var j=(i+1)%3;
			var k=(i+2)%3;
			
			if( arguments[i] > arguments[j]+arguments[k] ) throw new RangeError("Invalid lengths for triangle "+Array.prototype.join.call(arguments,','));
		}
	}


	/* incomplete */
	var checkVertexTriple = function(){
		/* all angles should some to < 180 */

		var vertexTriples = [0,1,2,3];
		vertexTriples.forEach(function(vertexIndex){
			var angleSum = 0;
				
			for(var i=0;i<triangleVertexes.length;i++){
				var vertexTriangleIndex;
				if((vertexTriangleIndex=triangleVertexes[i].indexOf(vertexIndex))>=0){
					var a = lengths[triangles[i][vertexTriangleIndex]];
					var b = lengths[triangles[i][(vertexTriangleIndex+1)%3]];
					var c = lengths[triangles[i][(vertexTriangleIndex+2)%3]];
					var A = Math.acos((b*b+c*c-a*a)/(2*b*c));
					angleSum+=A;
				}
			}
			//console.log("vertex "+vertexIndex+" was "+(( angleSum < Math.PI )?"acute":"obtuse"));
			//currently inconclusive
		});
	}

	var indexesToValues = function(indexes,values){
		return indexes.map(function(i){ return values[i] });
	}

	tetraCoords.indexesToValues = indexesToValues;

	var lengths;
	if(arguments[0] instanceof Array){
		lengths = arguments[0];
	} 
	else {
		lengths = Array.prototype.slice.call(arguments);
	}
	lengths = lengths.map(function(length,i,a){
		length = Number(length);
		if( isNaN(length) ){
			throw new TypeError("Invalid parameter provided to tetraCoords");
		}
		return length;
	});

	if( lengths.length != 6){
		throw new Error("tetraCoords expects 6 numbers, "+lengths.length+" provided");
	}

	triangles.forEach(function(triangle){
		checkTriangle.apply(null,indexesToValues(triangle,lengths));
	});

	checkVertexTriple();

	var verts = [];
	var baseTri = circleIntersection.apply(null,indexesToValues(triangles[0],lengths));
	var secondTri = circleIntersection.apply(null,indexesToValues(triangles[1],lengths))
	/*
	 * calculate position of first 3 vertexes ( that lie on the horizontal plane ), 
	 * to positoned relative to the centroid of the base triangle as the origin
	 */
	verts.push( new Vector(0,0,2*baseTri.y/3) );
	verts.push( new Vector(lengths[0]-baseTri.x,0,-baseTri.y/3) );
	verts.push( new Vector(-baseTri.x,0,-baseTri.y/3) );

	//console.log("secondTri: ",secondTri);

	/*
	 * calculate the midpoint for the last vertex along edge 0, and the normal for the plane it lies along
	 */
	var secondTriBaseMidpoint = Vector.lerp(verts[1],verts[2],secondTri.x/Vector.distance(verts[1],verts[2]));
	var secondTriBaseEdgePlane = verts[1].subtract(verts[2]).unit();
	
	//console.log("secondTriBaseMidpoint: "+secondTriBaseMidpoint);
	//console.log("secondTriBaseEdgePlane"+secondTriBaseEdgePlane);

	var vert0OnPlane = Vector.projectOntoPlane(verts[0],secondTriBaseEdgePlane,secondTriBaseMidpoint);
	var vert0DistanceToPlane = Vector.distance(vert0OnPlane,verts[0]);
	var vert0ToVert3Length = lengths[5];
	var thirdTri = circleIntersection( Vector.distance(vert0OnPlane,secondTriBaseMidpoint),Math.sqrt(vert0ToVert3Length*vert0ToVert3Length - vert0DistanceToPlane*vert0DistanceToPlane),secondTri.y );

	//console.log("vert0OnPlane",vert0OnPlane);
	//console.log("vert0DistanceToPlane",vert0DistanceToPlane);

	var horizontalNormal = new Vector(-secondTriBaseEdgePlane.z,0,secondTriBaseEdgePlane.x).unit().multiply(thirdTri.x);
	verts.push( secondTriBaseMidpoint.add( horizontalNormal ).add(new Vector(0,thirdTri.y,0)) );
	
	return verts;
}


var assert = function(name,a,b){
	s = 1000;
	if(s>0){
		a=Math.round(s*a)/s;
		b=Math.round(s*b)/s;
	}
	console.log(name+" "+a+"="+b+" "+((a==b)?"true":"false"))
}

/*
	calculate insection point for 2 cicles.
	c:Number, distance between the two circles
	a:Number, circle A's radius
	b:Number, circle B's radius

	returns Object:
	{
		x:Float midpoint along line that the intersection projects onto 
		y:Float distance along normal of the intersection
	}
*/
var circleIntersection = function(c,a,b){
	var out = {x:0,y:0};
	out.x = ( c*c - b*b + a*a ) / ( 2 * c );
	out.y = Math.sqrt((-c+b-a)*(-c-b+a)*(-c+b+a)*(c+b+a))/(2*c);
	return out;
}

var tetraCoordsTests = function(){
	
	tetraTest(4, 4, 4, 1, 4, 4);
	tetraTest(4, 3, 5, 2, 3, 4);
	tetraTest(5, 4, 5, 3, 4, 4); 
	tetraTest(5, 4, 5, 5, 3, 3);
	tetraTest(5, 5, 8, 5, 3, 4);
	tetraTest(6, 5, 8, 4, 3, 5);
	tetraTest(8, 1, 8, 4, 5, 5);
	tetraTest(8, 1, 8, 8, 1, 1);

}

var tetraTest = function(){
	var lengths = Array.prototype.slice.call(arguments);
	console.log("testing tetrahedron "+lengths.join(','));
	var verts = tetraCoords.apply(null,lengths);
	var calculatedLengths = tetraCoords.edges.map(function(edge){ 
		return tetraCoords.indexesToValues(edge,verts) 
	}).map(function(verts){ 
		return tetraCoords.Vector.distance(verts[0],verts[1]);
	});

	lengths.forEach(function(length,i){
		assert("triangle length ",length,calculatedLengths[i]);
	});
}

if( module ){
	module.exports = tetraCoords;

	if (require.main === module) {
		tetraCoordsTests();
	}

} 