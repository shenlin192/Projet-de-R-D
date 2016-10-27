//'use strict';

var ref = require('ref');
var ffi = require('ffi');

//typedef
//var LibRectangle=ref.refType(Rectangle);
//	Struct = require('ref-struct'),
//	intPtr = ref.refType('int'),
//	point = Struct({
//	    x: 'double',
//	    y: 'double',
//	}),
var hw = ffi.Library('./libhelloworld', {
	main: ['int', ['int']],
	_Z8additionii: ['int',['int','int']],
	_Z9creatRectii: ['int',['int','int']],
		//_ZN5DGtal8NaiveDSLIiiED2Ev: [intPtr, ['int', 'int', 'int']],
		//_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2ERKiS5_: [point, ['double', 'double']],
		//_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2Ev: [point, []],
		});
console.log(hw._Z8additionii(5,2));
console.log(hw._Z9creatRectii(5,2));
//console.log(hw._ZN9RectangleC1Eii(2,2));
//var dsl = hw._ZN5DGtal8NaiveDSLIiiED2Ev(2, 5, 0);
//console.log(dsl);
//var p = hw._ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2ERKiS5_(1, 2);
//var p = hw._ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC2Ev();
//console.log(p);
