'use strict';

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
    _ZN9RectangleC2Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], // ko
     
    _Z11createRect2ii: [RectangleType, ['int', 'int']],
    _Z14createRectPtr3ii: [RectanglePtrType, ['int', 'int']],
    
    _ZN9Rectangle9perimeterEv: ['int', [RectanglePtrType]],
    _ZN9Rectangle4areaEv: ['int', [RectanglePtrType]], // ok
   
});

var a, c, d;


/*
var c = new RectangleType();
console.log('là', c);
hw._ZN9RectangleC1ERS_(c.ref());
console.log('ici');
console.log(c);*/

console.log('---------------------------------');
console.log('Object constructed by JavaScript');
c = new RectangleType();
c.x = 30;
c.y = 4;
//This object can use functions of the rectangle class in c++ 
console.log('JavaScript built rectangle: ', hw._ZN9Rectangle9perimeterEv(c.ref()));

console.log('-----------------------------------------------');
console.log('Object constructed by C++ from existing buffer');
d = new RectangleType();
hw._ZN9RectangleC1Eii(d.ref(), 2, 9);
console.log(d);
console.log('C++ built rectangle area: ', hw._ZN9Rectangle4areaEv(d.ref()));
/*
console.log('-------------------------------------------------');
console.log('Object creation by a function returning a pointer');
a = hw._Z14createRectPtr3ii(15, 8);
console.log(a);
console.log('area of a: ', hw._ZN9Rectangle4areaEv(a));

console.log('-------------------------------------------------');
console.log('Object creation by a function returning an object');
/*b = hw._Z11createRect2ii(15, 10);
console.log(b);
console.log(b['ref.buffer']);
console.log(hw._ZN9Rectangle4areaEv(b['ref.buffer']));
console.log(hw._ZN9Rectangle9perimeterEv(b['ref.buffer']));*/

/*
function Rectangle(x, y) {
    this._buffer = hw._Z14createRectPtr3ii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9Rectangle4areaEv(this._buffer);
};

console.log(new Rectangle(3, 4).area());
*/

