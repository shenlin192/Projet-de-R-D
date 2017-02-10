'use strict';

/* eslint-env node */

//var ref = require('ref');
const ffi = require('ffi');

const hw = ffi.Library('../../build/Boost/lib/libBoostLib', {
    _Z9testBoostv: ['Pointer', []],
});

// Test the timer of Boost
hw._Z9testBoostv();
