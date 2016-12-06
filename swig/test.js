var mylib = require("./build/Release/mylib");
//var simpleClass = new mylib.MyClass(5);

console.log('-------test Global functions and variables---------')
console.log(mylib.My_variable);
console.log(mylib.fact(5));

console.log('-------test Rectangle---------')
var rectangle = new mylib.Rectangle(5,6);
console.log(rectangle.area());

console.log('-------test template---------')
var intRectangle = new mylib.intRectangle(3,4)
console.log(intRectangle.area())
var floatRectangle = new mylib.floatRectangle(3.2,4.25)
console.log(floatRectangle.area())

console.log('---------test Boost---------')
var boost = new mylib.TestBoost();
boost.boostTimer();
boost.boostLexicalCast();
boost.boostDate();


//var boost = new mylib.testBoost(5);
//console.log('hi');

//console.log('hi');
//var d = new mylib.Rectangle(3,4);

//console.log(d.perimeter());
