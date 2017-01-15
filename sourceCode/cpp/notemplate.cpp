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

//difinition of global functions
Rectangle createRectObj(int a, int b){
  Rectangle r1(a,b);
  return r1;
}

Rectangle* createRectPtr(int a, int b){
  return new Rectangle(a,b);
}

int add(int a, int b){
return a+b;
}

int main(){

	Rectangle c(2,3);	
	cout<<c.area()<<endl;		
	Rectangle d(c);
	d.setWidth(10);
	cout<<d.perimeter()<<endl;
	cout<<c.area()<<endl;	
	
}


