#include <DGtal/base/Common.h>

#include <iostream>
#include <sstream>
#include "DGtal/base/Common.h"
#include "DGtal/helpers/StdDefs.h"

#include "DGtal/io/boards/Board2D.h"

#include "DGtal/geometry/curves/ArithmeticalDSL.h"

using namespace std;
using namespace DGtal;


/*void exampleNaiveDSL()
{
  trace.beginBlock ( "Naive DSL" );

  using namespace Z2i; 

  // Construct a naive DSL from a, b, mu
  NaiveDSL<Integer> line( 2, 5, 0 ); 
	Point bottomLeft( 0, 0 );
}*/


//definition of a class
class Rectangle {
  private:
    int width, height;

  public:
    Rectangle (int,int);
    int area () {return (width*height);};
    //static int addition (int a, int b)
};

//definition of member functions
Rectangle::Rectangle (int a, int b) {
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


//a global function that return a self-define type
int creatRect(int a, int b){
  Rectangle r1(a,b);
  return r1.area();
}

//a main function
int main(int argc, char** argv)
{
  
 // DGtal::trace.info() << "Helloworld from DGtal ";
 //DGtal::trace.emphase() << "(version "<< DGTAL_VERSION << ")"<< std::endl;
 Rectangle rect(3,4);
 //cout<<rect.area()<<endl;
 //cout<<"hi33"<<endl;
	return 0;
}
