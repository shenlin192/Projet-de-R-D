//'use strict';

var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');

//define types
var RectangleType = Struct({
  'x': 'int',
  'y': 'int'
});

var RectanglePtrType = ref.refType(RectangleType);

//introduce foreign functions
var hw = ffi.Library('/home/shen/Desktop/PR&D/GitHub/build/libtemplateExampleLib', {
	_ZN9RectangleIiEC1Eii:[RectanglePtrType, [RectanglePtrType,'int', 'int']],
	
	_Z13createRectObjii: [RectangleType, ['int','int']],
	_Z13createRectRefii:[RectanglePtrType, ['int', 'int']],
	
	_ZN9RectangleIiE4areaEv: ['int', [RectanglePtrType]],
	_ZN9RectangleIiE9perimeterEv: ['int', [RectanglePtrType]],
	
		});


//encapsulate foreign functions into JS
function Rectangle(x, y) {
    this._buffer = hw._Z13createRectRefii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9RectangleIiE4areaEv(this._buffer);
}

//test
console.log(new Rectangle(3, 4).area());

console.log(hw._Z13createRectObjii(1,2));

let a = new RectangleType();
hw._ZN9RectangleIiEC1Eii(a.ref(),7,8);
console.log(hw._ZN9RectangleIiE4areaEv(a.ref()));

let b = new RectangleType();
b.x=3;
b.y=4;
console.log(hw._ZN9RectangleIiE4areaEv(b.ref()))


