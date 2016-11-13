//'use strict';

var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');

var RectangleType = Struct({
    'x': 'int',
    'y': 'int',
});

var RectanglePtrType = ref.refType(RectangleType);

var hw = ffi.Library('../build/libnotemplateLib', {
   // _ZN9RectangleC1ERS_: [RectangleType, [RectanglePtrType]],
   // _ZN9RectangleC2ERS_: [RectangleType, [RectanglePtrType]],
    
    _ZN9RectangleC1Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], // ok
    _ZN9RectangleC2Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], //same as the previous one
     
    _Z13createRectObjii: [RectangleType, ['int', 'int']],//not ok
    _Z13createRectPtrii: [RectanglePtrType, ['int', 'int']],//ok
    
    _ZN9Rectangle9perimeterEv: ['int', [RectanglePtrType]],//ok
    _ZN9Rectangle4areaEv: ['int', [RectanglePtrType]], // ok
   
});

var a, c, d;


console.log('---------------------------------');
console.log('Object constructed by JavaScript');
c = new RectangleType();
c.x = 30;
c.y = 4;
console.log('JavaScript built rectangle: ', hw._ZN9Rectangle9perimeterEv(c.ref()));

console.log('-----------------------------------------------');
console.log('Object constructed by C++ from existing buffer');
d = new RectangleType();
hw._ZN9RectangleC2Eii(d.ref(), 2, 9);
console.log(d);
console.log('C++ built rectangle area: ', hw._ZN9Rectangle4areaEv(d.ref()));

console.log('-------------------------------------------------');
console.log('Object created by a function returning a pointer');
a = hw._Z13createRectPtrii(15, 8);
console.log(a);
console.log('area of a: ', hw._ZN9Rectangle4areaEv(a));


console.log('-------------------------------------------------');
console.log('Object creation by a function returning an object');
console.log(hw._Z13createRectObjii(3, 4));
//console.log(b['ref.buffer']);
//console.log(hw._ZN9Rectangle4areaEv(b['ref.buffer']));
//console.log(hw._ZN9Rectangle9perimeterEv(b['ref.buffer']));


/*
function Rectangle(x, y) {
    this._buffer = hw._Z14createRectPtr3ii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9Rectangle4areaEv(this._buffer);
};

console.log(new Rectangle(3, 4).area());
*/

