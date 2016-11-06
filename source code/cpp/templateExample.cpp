#include <iostream>
#include <sstream>
using namespace std;

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

//a normal global function that uses the Rectangle class 
template<typename T> T createRect(T a, T b){
  Rectangle<T> r1(a,b);
  return r1.area() + r1.perimeter();
}

//a global function that returns a Rectangle object
Rectangle<int> createRectObj(int a, int b){
  Rectangle<int> r1(a,b);
  return r1;
}

//If a function is defined as a template, it cannot be found in nm
//Only when it has a specified type can it be used in JS
template<typename T> Rectangle<T>* createRectRef(T a, T b){
  return new Rectangle<T>(a,b);
}

//a global function that returns a Rectangle object
Rectangle<int>* createRectRef(int a, int b){
  return new Rectangle<int>(a,b);
}







