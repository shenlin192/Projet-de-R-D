#include <cstdio>
#include <cmath>
#include <iostream>
#include <fstream>

#include "DGtal/base/Config.h"
#include "DGtal/base/Common.h"


using namespace DGtal;
using namespace std;


void testSimple()
{
    trace.info()<< "This is an Info trace"<<endl;
    trace.warning()<< "This is an warning trace"<<endl;
    trace.error()<< "This is an Error trace"<<endl;
    trace.emphase()<< "This is an Emphased trace"<<endl;
    cerr<<endl;
}


int main(int argc, char** argv)
{
  
  DGtal::trace.info() << "Helloworld from DGtal ";
  DGtal::trace.emphase() << "(version "<< DGTAL_VERSION << ")"<< std::endl;
  
  return 0;
}
