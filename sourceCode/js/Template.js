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
var Template = ffi.Library('../../build/Template/lib/libTemplateLib', {
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


/****************************Int type***********************************/

//0 encapsulate foreign functions into JS
function Rectangle(x, y) {
    this._buffer = Template._Z13createRectRefii(x, y);
}

Rectangle.prototype.area = function area() {
    return Template._ZN9RectangleIiE4areaEv(this._buffer);
}

//1 object constructed by a function returning a pointer
console.log(new Rectangle(3, 4).area());

//2 object constructed by a function returning an object
console.log(Template._Z13createRectObjii(1,2));

//3 Object constructed by C++ constructor from existing buffer
var r1 = new RectangleType();
Template._ZN9RectangleIiEC1Eii(r1.ref(),7,8);
console.log(Template._ZN9RectangleIiE9perimeterEv(r1.ref()));

//4 Object constructed by JavaScript directly
var r2 = new RectangleType();
r2.x=3;
r2.y=4;
console.log(Template._ZN9RectangleIiE4areaEv(r2.ref()))

console.log("-----------------------------------------------------")


/****************************double type**************************/

//0 encapsulate foreign functions into JS
function Rectangle2(x, y) {
    this._buffer = Template._Z13createRectRefdd(x, y);
}

Rectangle2.prototype.area = function area() {
    return Template._ZN9RectangleIdE4areaEv(this._buffer);
}

//1 object constructed by a function returning a pointer
console.log(new Rectangle2(3.3, 4.3).area());

//2 object constructed by a function returning an object
console.log(Template._Z13createRectObjdd(1.2,2.2));

//3 Object constructed by C++ constructor from existing buffer
var r3 = new RectangleType2();
Template._ZN9RectangleIdEC1Edd(r3.ref(),7,8);
console.log(Template._ZN9RectangleIdE9perimeterEv(r3.ref()));

//4 Object constructed by JavaScript directly
var r4 = new RectangleType2();
r4.x=3.5;
r4.y=4.5;
console.log(Template._ZN9RectangleIdE4areaEv(r4.ref()))

