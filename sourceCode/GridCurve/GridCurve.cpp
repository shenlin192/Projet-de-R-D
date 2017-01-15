
// Basic includes
#include "DGtal/base/Common.h"
//StdDefs.h contains the Z2i namespace, which provides many type shortcuts. It includes the header required for the GridCurve object.
#include "DGtal/helpers/StdDefs.h"
#include <string>
//Drawing mechanism include
#include "DGtal/io/boards/Board2D.h"


using namespace std;
using namespace DGtal;



int main(int argc, char** argv){

  	//declare a curve
  	Z2i::Curve c; 
  	//load your grid curve from a text file that contains the coordinates of some points 
  	std::string square = "smallSquare.dat";  
  	
  	//initialize the grid curve from the file data 
  	std::fstream inputStream;
  	inputStream.open (square.c_str(), std::ios::in);
  	c.initFromVectorStream(inputStream);
  	inputStream.close();  
	
	//DGtal::Board2D is a nice way of displaying many 2D objects
    DGtal::Board2D aBoard;
    
    //Write the grid curve in a vector-graphics file
    aBoard << c;  
  	aBoard.saveEPS("DisplayGridCurveTuto.eps");
  	
	//Get the grid curve inner points
  	Z2i::Curve::InnerPointsRange r1 = c.getInnerPointsRange(); 
  	aBoard << r1; 
  	aBoard.saveEPS("InnerPointsRange.eps");
  	
  	//Get the grid curve incident points
  	Z2i::Curve::IncidentPointsRange r2 = c.getIncidentPointsRange(); 
  	aBoard << r2;  
  	aBoard.saveEPS("IncidentPointsRange.eps");
	


	return 0;
}

