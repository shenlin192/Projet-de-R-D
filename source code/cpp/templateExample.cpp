#include <DGtal/base/Common.h>

#include <iostream>
#include <sstream>
#include "DGtal/base/Common.h"
#include "DGtal/helpers/StdDefs.h"

#include "DGtal/io/boards/Board2D.h"

#include "DGtal/geometry/curves/ArithmeticalDSL.h"

using namespace std;
using namespace DGtal;

//definition of a class template
template<class T> class Rectangle {
  private:
    T width, height;

  public:
    Rectangle (T, T);
    T area () {return (width*height);};
    T perimeter () {return (2*width+2*height);};
};

//definition of member functions
template<class T> Rectangle<T>::Rectangle (T a, T b) {
	  width = a;
	  height = b;
}


//a normal global function
int addition (int a, int b)
{
  int r;
  r=a+b;
  return r;
}


//a normal global function that uses the Rectangle class 
int creatRect(int a, int b){
  Rectangle<int> r1(a,b);
  return r1.area() + r1.perimeter();
}

//a global function that return a Rectangle object
Rectangle<int> createRect2(int a, int b){
  Rectangle<int> r1(a,b);
  return r1;
}

//a global function that return a Rectangle object
Rectangle<int>* createRect3(int a, int b){
  return new Rectangle<int>(a,b);
}


