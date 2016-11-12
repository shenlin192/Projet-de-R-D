

#include <iostream>
#include <sstream>

using namespace std;

//definition of a class
class Rectangle {
  private:
    int width, height;

  public:
    Rectangle (int,int);
    //Rectangle(Rectangle& r);
    Rectangle(){};
    int area();
    int perimeter();

};

//definition of member functions
Rectangle::Rectangle (int a, int b) {
	  width = a;
	  height = b;
}
/*
Rectangle::Rectangle(Rectangle& r) {
    width = r.width;
    height = r.height;
}*/

int Rectangle::area() {
    return width * height;
}

int Rectangle::perimeter() {
    return 2 * width + 2 * height;
}

//a normal global function that uses the Rectangle class 
int calculate(int a, int b){
  Rectangle r1(a,b);
  return r1.area() + r1.perimeter();
}

//a global function that return a Rectangle object
Rectangle createRect2(int a, int b){
  Rectangle r1(a,b);
  return r1;
}

//a global function that return a Rectangle object
Rectangle* createRectPtr3(int a, int b){
  return new Rectangle(a,b);
}



