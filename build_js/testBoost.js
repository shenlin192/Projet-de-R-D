var ref = require('ref');
var ffi = require('ffi');

var hw = ffi.Library('../build/libtestBoostLib',{
	 _Z9testBoostv:['Pointer',[]],
	 })
	 
console.log(hw._Z9testBoostv());
