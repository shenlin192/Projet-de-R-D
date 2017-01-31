#include "DGtal/base/Common.h"
#include "DGtal/helpers/StdDefs.h"
#include "DGtal/io/boards/Board2D.h"
using namespace DGtal;
using namespace DGtal::Z2i;

Point* create2DPoint(int a, int b){
	return new Point(a,b);
}

void draw2DPoint(Point p1, Point p2){
	Board2D board;
	board << p1<<p2;
	board.saveSVG("draw2DPoint.svg");
}
