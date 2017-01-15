//'use strict';

var ffi = require('ffi');

var hw = ffi.Library('../../build/libhelloworldLib', {
	main: ['int', ['int']],
		});

console.log(hw.main(0))
