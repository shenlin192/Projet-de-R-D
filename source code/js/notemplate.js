'use strict';

var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');

var RectangleType = Struct({
    'x': 'int',
    'y': 'int',
});

var RectanglePtrType = ref.refType(RectangleType);

var hw = ffi.Library('../build/libhelloworldLib', {
    _Z8additionii: ['int', ['int', 'int']],
    _Z9creatRectii: ['int', ['int', 'int']],
    _ZN9RectangleC1ERS_: [RectangleType, [RectanglePtrType]],
    _ZN9RectangleC2ERS_: [RectangleType, [RectanglePtrType]],
    _ZN9RectangleC1Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], // ok
    _ZN9RectangleC2Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], // ko
    _ZN9Rectangle9perimeterEv: ['int', [RectanglePtrType]],
    _ZN9Rectangle4areaEv: ['int', [RectanglePtrType]], // ok
    _Z11createRect2ii: [RectangleType, ['int', 'int']],
    _Z11createRect3ii: [RectanglePtrType, ['int', 'int']],
});

var a, c, d;

console.log(hw._Z8additionii(5, 2));
console.log(hw._Z9creatRectii(5, 2));

/*
var c = new RectangleType();
console.log('là', c);
hw._ZN9RectangleC1ERS_(c.ref());
console.log('ici');
console.log(c);*/

console.log('Object construction by JavaScript');
console.log('---------------------------------');
c = new RectangleType();
c.x = 30;
c.y = 4;
console.log('JavaScript built rectangle area: ', hw._ZN9Rectangle4areaEv(c.ref()));

console.log('Object construction by C++ from existing buffer');
console.log('-----------------------------------------------');
d = new RectangleType();
hw._ZN9RectangleC1Eii(d.ref(), 2, 9);
console.log(d);
console.log('C++ built rectangle area: ', hw._ZN9Rectangle4areaEv(d.ref()));

console.log('Object creation by a function returning a pointer');
console.log('-------------------------------------------------');
a = hw._Z11createRect3ii(15, 8);
console.log(a);
console.log('area of a: ', hw._ZN9Rectangle4areaEv(a));

console.log('Object creation by a function returning an object');
console.log('-------------------------------------------------');
/*b = hw._Z11createRect2ii(15, 10);
console.log(b);
console.log(b['ref.buffer']);
console.log(hw._ZN9Rectangle4areaEv(b['ref.buffer']));
console.log(hw._ZN9Rectangle9perimeterEv(b['ref.buffer']));*/

console.log(new Rectangle(3, 4).area());

function Rectangle(x, y) {
    this._buffer = hw._Z11createRect3ii(x, y);
}

Rectangle.prototype.area = function area() {
    return hw._ZN9Rectangle4areaEv(this._buffer);
};

