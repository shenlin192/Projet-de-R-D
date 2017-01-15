/***********************************************************************/
/***********************difinition part*********************************/
/***********************************************************************/

var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');

//define types
var RectangleType = Struct({
  'x': 'int',
  'y': 'int'
});

var RectangleType2 = Struct({
  'x': 'double',
  'y': 'double'
});

var RectanglePtrType = ref.refType(RectangleType);

var RectanglePtrType2 = ref.refType(RectangleType2);

//introduce foreign functions
var hw = ffi.Library('./libtemplateExampleLib', {
	/****************************Int type***********************************/
	//Rectangle created by constructor
	_ZN9RectangleIiEC1Eii:[RectanglePtrType, [RectanglePtrType,'int', 'int']],
	
	//Rectangle created static functions
	_Z13createRectObjii: [RectangleType, ['int','int']],
	_Z13createRectRefii:[RectanglePtrType, ['int', 'int']],
	
	//menber functions of Rectangle
	_ZN9RectangleIiE4areaEv: ['int', [RectanglePtrType]],
	_ZN9RectangleIiE9perimeterEv: ['int', [RectanglePtrType]],
	
	
	/****************************double type***********************************/
	//Rectangle created by constructor
	_ZN9RectangleIdEC1Edd:[RectanglePtrType2, [RectanglePtrType2,'double', 'double']],
	
	//Rectangle created static functions
	_Z13createRectObjdd: [RectangleType2, ['double','double']],
	_Z13createRectRefdd:[RectanglePtrType2, ['double', 'double']],
	
	//menber functions of Rectangle
	_ZN9RectangleIdE4areaEv: ['double', [RectanglePtrType2]],
	_ZN9RectangleIdE9perimeterEv: ['double', [RectanglePtrType2]],
	
		});

/***********************************************************************/
/***********************JavaScript part*********************************/
/***********************************************************************/


/****************************Int type***********************************/

//encapsulate foreign functions into JS
function Rectangle(x, y) {
    this._buffer = hw._Z13createRectRefii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9RectangleIiE4areaEv(this._buffer);
}

//1 object constructed by a function returning a pointer
console.log(new Rectangle(3, 4).area());

//2 object constructed by a function returning an object
console.log(hw._Z13createRectObjii(1,2));

//3 Object constructed by C++ constructor
var a = new RectangleType();
hw._ZN9RectangleIiEC1Eii(a.ref(),7,8);
console.log(hw._ZN9RectangleIiE9perimeterEv(a.ref()));

//4 Object constructed by JavaScript
var b = new RectangleType();
b.x=3;
b.y=4;
console.log(hw._ZN9RectangleIiE4areaEv(b.ref()))

console.log("-----------------------------------------------------")


/****************************double type**************************/

//encapsulate foreign functions into JS
function Rectangle2(x, y) {
    this._buffer = hw._Z13createRectRefdd(x, y);
}

Rectangle2.prototype.area = function area() {
    return hw._ZN9RectangleIdE4areaEv(this._buffer);
}

//1 object constructed by a function returning a pointer
console.log(new Rectangle2(3.3, 4.3).area());

//2 object constructed by a function returning an object
console.log(hw._Z13createRectObjdd(1.2,2.2));

//3 Object constructed by C++ constructor
var c = new RectangleType2();
hw._ZN9RectangleIdEC1Edd(c.ref(),7,8);
console.log(hw._ZN9RectangleIdE9perimeterEv(c.ref()));

//4 Object constructed by JavaScript
var d = new RectangleType2();
d.x=3.5;
d.y=4.5;
console.log(hw._ZN9RectangleIdE4areaEv(d.ref()))

