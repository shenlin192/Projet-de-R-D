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

var Dgtal = ffi.Library('../../build/2DPoints/lib/lib2DPointsLib',{
	_ZNSt15binary_functionIN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES4_dEC1Ev:[
		PointStructRef,[PointStructRef,'int','int'] // not ok
	],
	_Z13create2DPointii:[PointStructRef,['int','int']],//ok
	_Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES3_:[
	'void',[PointStructRef,PointStructRef]]//ok
});

// 1
var p1 = Dgtal._Z13create2DPointii(3,4)
console.log(p1);
//Dgtal._Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEE(p1);

// 2
var p2 = new PointStruct();
p2.x = 1;
p2.y = 2;
console.log(p2)
Dgtal._Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES3_(p1,p2.ref());

// 3 
var p3 = new PointStruct();
Dgtal._ZNSt15binary_functionIN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEES4_dEC1Ev(p3.ref(),4,5)
console.log(p3)

