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
var intRef = ref.refType('int');

var Dgtal = ffi.Library('../../build/2DPoints/lib/lib2DPointsLib', {
    // _ZNSt15binary_functionIN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES4_dEC1Ev: [
    //     PointStructRef, [PointStructRef, 'int', 'int'] // fail
    // ],

    _Z13create2DPointii: [PointStructRef, ['int', 'int']], //ok
    _Z11draw2DPointN5DGtal11PointVectorILj2EiNSt3__15arrayIiLm2EEEEES4_: [
        'void', [PointStructRef, PointStructRef],
    ], //ok

    //Dgtal 2D point constructor
    //SyntaxError: Unexpected identifier
    _ZN5DGtal11PointVectorILj2EiNSt3__15arrayIiLm2EEEEC1ERKiS6_: [
        PointStructRef, [PointStructRef, intRef, intRef],
    ], // fail

});

// 1 Using a custom difine constructor
let p1 = Dgtal._Z13create2DPointii(3, 4);
console.log(p1); // <Buffer@0x38c49b0 03 00 00 00 04 00 00 00>


// 2 Create points by JavaScript
let p2 = new PointStruct();
p2.x = 1;
p2.y = 2;
// { x: 1,
//   y: 2,
//   'ref.buffer': <Buffer@0x38aab70 01 00 00 00 02 00 00 00> }
Dgtal._Z11draw2DPointN5DGtal11PointVectorILj2EiNSt3__15arrayIiLm2EEEEES4_(p1, p2.ref());
console.log('p2: ', p2);


// 3 Using the constructor of DGtal
let p3 = new PointStruct();
let i1 = ref.alloc(ref.types.int, 2);
let i2 = ref.alloc(ref.types.int, 9);
Dgtal._ZN5DGtal11PointVectorILj2EiNSt3__15arrayIiLm2EEEEC1ERKiS6_(p3.ref(), i1, i2);
console.log('p3: ', p3);

