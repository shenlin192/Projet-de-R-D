#include <iostream>
#include <sstream>

using namespace std;

//definition of a class
class Rectangle {
  private:
    int width, height;

  public:
    Rectangle (int,int);
   // Rectangle(Rectangle& r);
   // Rectangle(){};
    int area();
    int perimeter();
    void setWidth(int);

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
}
*/

int Rectangle::area() {
    return width * height;
}

int Rectangle::perimeter() {
    return 2 * width + 2 * height;
}

void Rectangle::setWidth(int a){
	width = a;
}

