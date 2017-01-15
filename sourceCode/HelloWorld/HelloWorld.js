//Problem: how to invoke those trace functions directly from the shared object library

const ref = require('ref');
const ffi = require('ffi');
//const Struct = require('ref-struct');

var Dgtal = ffi.Library('../../build/HelloWorld/lib/libHelloWorldLib',{
	_Z10testSimplev:["void",[]],//ok
	_ZN5DGtal5Trace4infoEv:["void",[]]
});

Dgtal._Z10testSimplev();//ok
Dgtal._ZN5DGtal5Trace4infoEv();//core dump

