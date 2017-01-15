const ref = require('ref');
const ffi = require('ffi');
const Struct = require('ref-struct');

var PointStruct = Struct({
    'x': 'int',
    'y': 'int',
});

var PointStructRef = ref.refType(PointStruct);

var Dgtal = ffi.Library('../../build/2DPoints/lib/lib2DPointsLib',{
	_Z13create2DPointii:[PointStructRef,['int','int']],//ok
	_Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEE:['void',[PointStructRef]]
});

var p1 = Dgtal._Z13create2DPointii(3,4)
Dgtal._Z11draw2DPointN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEE(p1);
