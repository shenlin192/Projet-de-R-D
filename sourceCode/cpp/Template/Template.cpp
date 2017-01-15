#include <iostream>
#include <sstream>
using namespace std;

//definition of a template class 
template<class T> class Rectangle {
  private:
    T width, height;

  public:
    Rectangle (T, T);
    T area ();
    T perimeter ();
};

template<class T> Rectangle<T>::Rectangle (T a, T b) {
	  width = a;
	  height = b;
}

template <class T>
T Rectangle<T>::area(){
	return width*height;
}

template <class T>
T Rectangle<T>::perimeter(){
	return (width+height)*2;
}

//Realise the calRect template
int calRect(int a, int b){
 	Rectangle<int> r1(a,b);
  	return r1.area() + r1.perimeter();
}

double calRect(double a, double b){
 	Rectangle<double> r1(a,b);
  	return r1.area() + r1.perimeter();
}


//Create type 'int' and type 'double' Rectangle object by using the template class
Rectangle<int> createRectObj(int a, int b){
  Rectangle<int> r1(a,b);
  return r1;
}

Rectangle<double> createRectObj(double a, double b){
  Rectangle<double> r1(a,b);
  return r1;
}


//Create type 'int' and type 'double' Rectangle reference by using the template class
Rectangle<int>* createRectPtr(int a, int b){
  return new Rectangle<int>(a,b);
}

Rectangle<double>* createRectPtr(double a, double b){
  return new Rectangle<double>(a,b);
}








