//#include <DGtal/base/Common.h>
//#include "DGtal/base/Common.h"
//#include "DGtal/helpers/StdDefs.h"

#include <DGtal/base/Common.h>
#include <DGtal/kernel/SpaceND.h>
#include <DGtal/helpers/StdDefs.h>
#include <DGtal/kernel/domains/HyperRectDomain.h>


//usage of DGtal
int main(int argc, char** argv)
{

	DGtal::Z2i::Point p(13,-5);
	DGtal::Z2i::Point q(0,0);
	
	if (p > q){
 	DGtal::trace.info() << "Helloworld from DGtal ";
 	DGtal::trace.emphase() << "(version "<< DGTAL_VERSION << ")"<< std::endl;
	}
	
	return 0;
}

