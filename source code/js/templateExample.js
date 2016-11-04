//'use strict';

var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');

var RectangleType = Struct({
  'x': 'int',
  'y': 'int'
});

var RectanglePtrType = ref.refType(RectangleType);

function Rectangle(x, y) {
    this._buffer = hw._Z11createRect3ii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9Rectangle4areaEv(this._buffer);
}

var Dgtal = ref.types.void;
//typedef
//var LibRectangle=ref.refType(Rectangle);
//	Struct = require('ref-struct'),
//	intPtr = ref.refType('int'),
//	point = Struct({
//	    x: 'double',
//	    y: 'double',
//	}),
var hw = ffi.Library('./libhelloworldLib', {
	_Z8additionii: ['int', ['int','int']],
	_Z9creatRectii: ['int', ['int','int']],
	_Z11createRect2ii: [RectangleType, ['int','int']],
	_ZN9Rectangle4areaEv: ['int', [RectanglePtrType]],
	_ZN9Rectangle9perimeterEv: ['int', [RectanglePtrType]],
	_Z11createRect3ii:[RectanglePtrType, ['int', 'int']],
		//_ZN5DGtal8NaiveDSLIiiED2Ev: [intPtr, ['int', 'int', 'int']],
		//_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2ERKiS5_: [point, ['double', 'double']],
		//_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2Ev: [point, []],
		});
console.log(hw._Z8additionii(5, 2));
console.log(hw._Z9creatRectii(5, 2));

var a = hw._Z11createRect3ii(15, 8);
console.log(a);
console.log(hw._ZN9Rectangle4areaEv(a));

var b = hw._Z11createRect2ii(15, 10);
console.log(b);
console.log(b['ref.buffer']);
console.log(hw._ZN9Rectangle4areaEv(b['ref.buffer']));
console.log(hw._ZN9Rectangle9perimeterEv(b['ref.buffer']));

console.log(new Rectangle(3, 4).area());
//console.log(hw._ZN9Rectangle4areaEv(b));
//console.log(hw._ZN9RectangleC1Eii(2,2));
//var dsl = hw._ZN5DGtal8NaiveDSLIiiED2Ev(2, 5, 0);
//console.log(dsl);
//var p = hw._ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2ERKiS5_(1, 2);
//var p = hw._ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2Ev();
//console.log(p);
