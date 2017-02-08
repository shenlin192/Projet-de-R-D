# Intégration d’un interprète JavaScript dans DGtal
## Goal
This project aims to provide a JavaScript command interpreter for [DGtal](http://dgtal.org/)(a C++ geometry library). This documentation explains the experimental part of the project.

You can click [here](https://www.sharelatex.com/project/58340f92c0f0db5876a1a377) to read a full report.

# Contents:

* [FFI Experiments](#1)

* [SWIG Experiments](#2)

* [Clang and LLVM Experiments](#3)

## prerequest
1. A Linux system
2. Install [nodejs](https://nodejs.org/en/)
3. Install [ffi](https://github.com/node-ffi/node-ffi)  
4. Install [DGtal](http://dgtal.org/doc/stable/moduleBuildDGtal.html)
5. Install [CMake](https://cmake.org/install/)

## How to use?
1. Clone this repo
2. new a directory in your project path and name it "build" `~your projectPath$ mkdir build`
3. go to the "build" directory and run the cmake command `~your projectPath/build$ cmake ../sourceCode`
4. run the make command in newly created "build" directory `~your projectPath/build$ make`

    After these 4 steps, you have already generated all necessary files for this project.
    Now you can go to the `sourceCode` directory and chose any experiment for testing:

5. `~your projectPath/sourceCode/experimentName$ node experimentName.js`

All the file path configuration are in a `CMakeLists.txt` under the `sourceCode` directory. If you want to change the structure of this project, just modify this file and rerun the `cmake` and `make` command.


<h1 id="1">FFI Experiments</h1>

Our FFI experiments consist of 4 parts. The common goal of these experiments is to use C++ library from within JavaScript by using node-ffi. For each example, I will firstly explain the C++ library that is going to be used, and then explain how to use that library in JavaScript.

## BasicUsage

### BasicUsage Library
The source code to create a library for this experiment is in path "./sourceCode/cpp/BasicUsage.cpp". It contains:

1. a global function `add` that adds two Integrate and returns the sum
2. a class `Rectangle` that contains two private attributes (long and width) and two member functions that calculate its area and perimeter respectively.
3. a global function `createRectObj` that returns a rectangle object
4. a global function `createRectRef` that returns a rectangle pointer.

### BasicUsage test
The source code to test a library for this experiment is in path "./sourceCode/js/BasicUsage.js".
In this test, we have accomplished to

1. Use the function `add` in JavaScript
2. Create a `Rectangle` object directly in JavaScript
3. Create a `Rectangle` object in C++ from existing buffer (directly invoke C++ constructor of BasicUsage Library)
4. Create a `Rectangle` object by using the `createRectObj` function
5. Create a `Rectangle` object pointer by using the `createRectPtr` function
6. Encapsulate the creation of C++ object into JavaScript function prototype, so that we can use that object with JavaScript syntax.

In order to create a C++ class object with Node FFI, we need to firstly define a structure that has the same attributes in JavaScript code as the class in C++ code. The definition of a structure in JavaScript can be done by requiring the "ref-struct" model of Node. Moreover, if we to want to get the reference of any variable defined in JavaScript, we will need the "ref" model of Node.

In order to use a C++ class's functions, such as its constructors or member functions, in Node-ffi, the reference of an object created by that class should be passed into these functions as their default parameters.


## Template
### Template Library
The source code to create a library for this experiment is in path "./sourceCode/cpp/Template.cpp". Its structure is almost the same as the library in BasicUsage experiment expect that it's written in the form of C++ template. We have not rewrite the function `add` into template form for simplicity of code.

It's a must to implement all the types that we are going to use lately in this library, which means the template classes or functions can not be used directly through node-ffi. Because without specifying types, template functions or template classes cannot be generated into a library's symbol table and thus cannot be found by node-ffi. As for this experiment, type "int" and type "double" are realized.


### Template test  
Source code for testing this experiment is in path "./sourceCode/js/Template".
Similar to what we have done for BasicUsage's test, this experiment has:


1. Create a `Rectangle` object directly in JavaScript
2. Create a `Rectangle` object in C++ from existing buffer (directly invoke C++ constructor of Template Library)
3. Create a `Rectangle` object by using the `createRectObj` function
4. Create a `Rectangle` object pointer by using the `createRectPtr` function
5. Encapsulate the creation of C++ object into JavaScript function prototype, so that we can use that object with JavaScript syntax.

The main difference is, this time in the JavaScript file, we have to specific which type (int or double) of the template classes or functions is needed. It's worth noting that, in order to distinguish functions or classes that have the same name in C++ source file, the compiler does something called "name mangling", so that after compilation, each function or class will only have a unique name. In our experiment for example, `_Z13createRectObjii` represents the `Rectangle<int> createRectObj(int a, int b)` function in source code; `_Z13createRectObjdd` represents the `Rectangle<double> createRectObj(double a, double b)` .

## Boost
### Boost library
Source code to create library for Boost experiment is in path "./sourceCode/cpp/Boost.cpp".
Since there are numbers of functions predefined in Boost, we chose only one of them to test if Boost can cooperate with node-ffi. In this experiment, the `timer` and `progress` of Boost are chosen as for testing.  

It's worth noting that we do not expose Boost directly to node-ffi. Instead, we created a wrapper function `testBoost` containing the necessary C++ code of Boost for lately using.

### Boost test
The source code for boost timer test is in path "./sourceCode/js/Boost.js". The usage of Boost with FFI is the same as the BasicUsage (like calling a normal global function, calling a global variable...). All we need to do is to "include" the Boost library in the C++ file, and then generate a shared library. After that functions defined in Boost can be used easily from JavaScript.

## 2DPoint
### 2DPoint library
Source code to create library for Boost experiment is in path "./sourceCode/cpp/2DPoint.cpp".

In the source code, there are two functions, both of which are wrappers that used as the media to invoke DGtal functions.


```
Point* create2DPoint(int a, int b){
    return new Point(a,b);
}
```

Where `Point()` is a built-in constructor of DGtal.

```
void draw2DPoint(Point p1, Point p2){
    Board2D board;
    board << p1<<p2;
    board.saveSVG("draw2DPoint.svg");
}
```

Where `Board2D` is a built-in class of DGtal.

### 2DPoint test
Code for this test is in path "./sourceCode/cpp/2DPoint.js".
In this test, I've created a point at (3,4) and the other at (1,2) by using the
`create2DPoint` function.
After that, I draw these two points with the help of `draw2DPoint`.
You can click [here](https://github.com/shenlin192/Projet-de-R-D/blob/master/sourceCode/2DPoints/draw2DPoint.svg)
to see the result.

### Go further
Instead of using a wrapper to invoke DGtal functions, it would be much easier and more
straightforward to invoke DGtal functions directly.

Use command `$ objdump -S lib2DPointsLib.so |less`, I found out that the symbol of the constructor for a 2 dimension point is `_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC1ERKiS5_` as shown in the following figure
![](/images/assembleSymbol)

So, I tried to use `_ZN5DGtal11PointVectorILj2EiSt5arrayIiLm2EEEC1ERKiS5_` in the 2DPoint test. However,
node FFI can not find this symbol and shows "SyntaxError: Unexpected identifier". I've verified many times
that this symbol does exist in the shared object library file. But I can't figure out why there will be an
Unexpected identifier error.

<h1 id="2">SWIG Experiments</h1>
## Prerequisite

## interface file

## head file

## test file


<h1 id="3">Clang and LLVM Experiments</h1>

## Prerequisite

1. CMake 2.8.6 or later
2. 30G disk space
3. 6G swap space

## Install

1. Download llvm:

        `$ cd where-you-want-llvm-to-live`

        `$ svn co http://llvm.org/svn/llvm-project/llvm/trunk llvm`

2. Download Clang:

        `$ cd where-you-want-llvm-to-live`

        `$ cd llvm/tools`

        `$ svn co http://llvm.org/svn/llvm-project/cfe/trunk clang`

3. Download Compile-RT:

        `$ cd where-you-want-llvm-to-live`

        `$ cd llvm/projects`

        `$ svn co http://llvm.org/svn/llvm-project/compiler-rt/trunk compiler-rt`

4. Install

        `$ cd where you want to build llvm`

        `$ mkdir build`

        `$ cd build`

        `$ cmake -G Unix Makefiles <path to llvm sources>`

5. Make. This will take a very long time

        `$ cd where you want to build llvm`

        `$ make`

## How to increase your swap space?
As mentioned in the prerequisite, at least 6GB swap space is needed to install LLVM.
However, by default, the swap space is the size of memory, which may be less than 6GB.
Thus, we need to add swap space manually. The following code shows how to add 4GB to swap space.

1. `$ dd if=/dev/zero of=/swapfile bs=1024 count=4000000`
2. `$ mkswap /swapfile`
3. `$ swapon /swapfile`

If you run out of swap space, you will get an error like this:
![](/images/errorMessage.png)

## Display the AST

The following command can be used to display the AST of a chosen c/c++ file

`$ clang -Xclang -ast-dump -fsyntax-only <file_name>`

### A simple example

```
int f(int x) {
  int result = (x / 42);
  return result;
}
```
![](/images/simpleExample.png)

The top-level declaration in a translation unit is always the `translation unit declaration`. In this example, our first user-written declaration is the function declaration of “f”. The body of “f” is a `compound statement`, whose child nodes are a `declaration statement` that declares our result variable, and the return statement.


### A deliberated error

```
int a =1;

int function (){
  while (a==1){
    a++;
  };
  int b=3;
  int b=4;
}
```

![](/images/test.cc.png)

In this example, our deliberately redefined variable `b` in a function body is detected as an error.
The `while` block corresponds to the `WhileStmt`.


I've made [notes](/clang/readme.md) on some basic symbols of Clang.
For more information, you need to visit [clang's official site](http://clang.llvm.org/docs/IntroductionToTheClangAST.html)

<!-- C1Edd version double constructor
C1Eii verstion int constructor -->
