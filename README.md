# Tetrahedron Calculator

Given a series of edge lengths, function outputs 4 vertexes that furfil that shape.

### Usage

```
var tetraCoords = require('tetrahedronCalculator.js');

tetraCoords(e0,e1,e2,e3,e4,e5);
///or
tetraCoords.apply(null,edges);
//returns array of objects of form {x:Number,y:Number}
```
![Diagram](https://raw.githubusercontent.com/paulhayes/tetrahedronCalculator/master/Tetrahedron.png)
