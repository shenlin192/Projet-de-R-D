# Intégration d’un interprète JavaScript dans DGtal
## How to use?
1. new a directory in your project path and name it "build" "~your projectPath$ mkdir build"
2. go to the "build" directory and run the cmake command "~your projectPath/build$ cmake ../source\ code"
3. run the make command in the "build" directory "~your projectPath/build$ make"

##You can click [here](https://www.sharelatex.com/project/58340f92c0f0db5876a1a377) to read the report of this project

# Documentation of each example
## notemplate (basic usage)
In the file "notemplate.js", we have accomplished to 
1. Create an C++ object by JavaScript 
2. Create an C++ object by using C++ constructor function
3. Create an C++ object by using a C++ static function that returns an object 
4. Encapsulate the creation of C++ object into JavaScript function prototype, so that we can use that object with JavaScript syntax.

Note: In order to use a C++ class with Node FFI, we need to firstly define a structure that has the same attributes (in JavaScript) as the class (in C++). The definition of a structure in JavaScript can be done by requiring the "ref-struct" model of Node. Moreover, if we to want get the reference of any variable defined in JavaScript, we will need the "ref" model of Node. 	

## template
In the file of "templateExample.js", we have tested the usage of C++ template classes and functions with JavaScript.
  
Firstly, we need to implement each type that we are going to use in the C++ file, which means the template classes or functions can not be use directly. Secondly, in the JavaScript file, we have to specific which type (eg. int, double) of the template classes or functions is needed. It's worth noting that, in order to distinguish functions or classes that have the same name in C++ source file, the compiler does  something called "name mangling", so that after compilation, each function or class will only have a unique name.    

## Boost
In the file of "testBoost.js", we have tested the library of Boost. The usage of Boost with FFI is the same as the basic usage (like calling a normal global function, calling a global variable...). All we need to do is to "include" the Boost library in the C++ file, and then generate a shared library, and then we can use functions defined in Boost from JavaScript. 


