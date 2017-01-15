//'use strict';

var ffi = require('ffi');

var hw = ffi.Library('/home/shen/Desktop/PR&D/GitHub/build/libhelloworldLib', {
	main: ['int', ['int']],
		});

console.log(hw.main(0))
