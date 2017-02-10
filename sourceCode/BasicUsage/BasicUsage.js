'use strict';

/* eslint-env node */

const ref = require('ref');
const ffi = require('ffi');
const Struct = require('ref-struct');

const RectangleType = Struct({
    'x': 'int',
    'y': 'int',
});

const RectanglePtrType = ref.refType(RectangleType);

const BasicUsage = ffi.Library('../../build/BasicUsage/lib/libBasicUsageLib', {
    _Z3addii: ['int', ['int', 'int']],

    _ZN9RectangleC1Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], // ok
    _ZN9RectangleC2Eii: [RectanglePtrType, [RectanglePtrType, 'int', 'int']], //same as the previous one

    _Z13createRectObjii: [RectangleType, ['int', 'int']], //ok
    _Z13createRectPtrii: [RectanglePtrType, ['int', 'int']], //ok

    _ZN9Rectangle9perimeterEv: ['int', [RectanglePtrType]], //ok
    _ZN9Rectangle4areaEv: ['int', [RectanglePtrType]], // ok

});

// 0 Test the function add
console.log(BasicUsage._Z3addii(2, 6));

// Test the Rectangle class


// 1 Create rectangle object in JavaScript directly
console.log('---------------------------------');
console.log('Object constructed by JavaScript');
let r1 = new RectangleType();
r1.x = 30;
r1.y = 4;
console.log('JavaScript built rectangle: ', BasicUsage._ZN9Rectangle9perimeterEv(r1.ref()));


// 2 Create rectangle object in C++ from existing buffer
console.log('-----------------------------------------------');
console.log('Object constructed by C++ from existing buffer');
let r2 = new RectangleType();
BasicUsage._ZN9RectangleC2Eii(r2.ref(), 2, 9);
console.log(r2);
console.log('C++ built rectangle area: ', BasicUsage._ZN9Rectangle4areaEv(r2.ref()));


// 3 Create rectangle object in C++ from function returning a pointer
console.log('-------------------------------------------------');
console.log('Object created by a function returning a pointer');
let r3 = BasicUsage._Z13createRectPtrii(15, 8);
console.log(r3);
console.log('area of a: ', BasicUsage._ZN9Rectangle4areaEv(r3));


// 4 Create rectangle object in C++ from function returning an object
console.log('-------------------------------------------------');
console.log('Object created by a function returning an object');
let r4 = BasicUsage._Z13createRectObjii(3, 4);
console.log(BasicUsage._ZN9Rectangle9perimeterEv(r4.ref()));


// 5 Encapsulate into JavaScript syntax
console.log('-------------------------------------------------');
console.log('Encapsulate static functions into JS');
function Rectangle(x, y) {
    this._buffer = BasicUsage._Z13createRectPtrii(x, y);
}

Rectangle.prototype.area = function area() {
    return BasicUsage._ZN9Rectangle4areaEv(this._buffer);
};

console.log(new Rectangle(3, 4).area());

function Rectangle2(x, y) {
    this._buffer = BasicUsage._ZN9RectangleC2Eii((new RectangleType()).ref(), x, y);
}

Rectangle2.prototype.area = function area() {
    return BasicUsage._ZN9Rectangle4areaEv(this._buffer);
};

console.log(new Rectangle2(3, 4).area());


