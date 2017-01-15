#include <iostream>
#include <sstream>

using namespace std;

//A global function
int add(int a, int b){
	return a+b;
}

//definition of a class
class Rectangle {
  private:
    int width, height;

  public:
    Rectangle (int,int);
    int area();
    int perimeter();
    void setWidth(int);

};

//definition of member functions
Rectangle::Rectangle (int a, int b) {
	  width = a;
	  height = b;
}

int Rectangle::area() {
    return width * height;
}

int Rectangle::perimeter() {
    return 2 * width + 2 * height;
}

void Rectangle::setWidth(int a){
	width = a;
}


//Function that returns an object
Rectangle createRectObj(int a, int b){
  Rectangle r1(a,b);
  return r1;
}

//Function that returns an object pointer
Rectangle* createRectPtr(int a, int b){
  return new Rectangle(a,b);
}




