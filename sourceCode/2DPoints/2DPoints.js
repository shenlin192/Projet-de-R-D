'use strict';

/* eslint-env node */

// Problem 1 input output stream
// Problem 2 use C++ 2D point constructor will lead to unexpected result
const ref = require('ref');
const ffi = require('ffi');
const Struct = require('ref-struct');

var PointStruct = Struct({
    'x': 'int',
    'y': 'int',
});

var PointStructRef = ref.refType(PointStruct);

var Dgtal = ffi.Library('../../build/2DPoints/lib/lib2DPointsLib', {
    // _ZNSt15binary_functionIN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES4_dEC1Ev: [
    //     PointStructRef, [PointStructRef, 'int', 'int'] // fail
    // ],

    _Z13create2DPointii: [PointStructRef, ['int', 'int']], //ok
    _Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES3_: [
        'void', [PointStructRef, PointStructRef],
    ], //ok

    //Dgtal 2D point constructor
    //SyntaxError: Unexpected identifier
    // _ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC1ERKiS5_: [
    //       PointStructRef, [PointStructRef, 'int', 'int']
    // ] fail

});

// 1 Using a custom difine constructor
let p1 = Dgtal._Z13create2DPointii(3, 4);
console.log(p1); // <Buffer@0x38c49b0 03 00 00 00 04 00 00 00>


// 2 Create points by JavaScript
let p2 = new PointStruct();
p2.x = 1;
p2.y = 2;
console.log(p2);
// { x: 1,
//   y: 2,
//   'ref.buffer': <Buffer@0x38aab70 01 00 00 00 02 00 00 00> }
Dgtal._Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES3_(p1, p2.ref());


// 3 Using the constructor of DGtal
// var p3 = new PointStruct();
// Dgtal._ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC1ERKiS5_(p3.ref(), 4, 5)
// console.log(p3)
