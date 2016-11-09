#include <iostream>
#include "DGtal/base/Common.h"
#include "DGtal/helpers/StdDefs.h"
#include "ConfigExamples.h"
#include "DGtal/geometry/curves/FreemanChain.h"
#include "DGtal/geometry/curves/GridCurve.h"
#include "DGtal/topology/helpers/Surfaces.h"
#include "DGtal/io/boards/Board2D.h"
using namespace std;
using namespace DGtal;
using namespace Z2i; 
template <typename CI>
void displayAll( const CI& ciBegin, const CI& ciEnd ) 
{
  if ( isNotEmpty(ciBegin, ciEnd) ) 
  { //if the range is not empty
    CI i( ciBegin); 
    do 
    {
      trace.info() << *i;
      i++;
    } while (i != ciEnd);
    trace.info() << endl;    
  }    
}
int main( int argc, char** argv )
{
  trace.beginBlock ( "Example for 2d gridcurves" );
  trace.info() << "Args:";
  for ( int i = 0; i < argc; ++i )
    trace.info() << " " << argv[ i ];
  trace.info() << endl;
  string square = examplesPath + "samples/smallSquare.dat";
  string S = examplesPath + "samples/contourS.fc";
  
    // domain
    Point lowerBound( -50, -50 );
    Point upperBound( 50, 50 );
  //default construction
  Curve c1; 
  //from a Khalimsky space
  K2 ks; ks.init( lowerBound, upperBound, true ); 
  Curve c2( ks ); 
  
  trace.emphase() << "Input" << endl;
  trace.info() << "\t from a data file " << endl;
  {
    fstream inputStream;
    inputStream.open (square.c_str(), ios::in);
    c1.initFromVectorStream(inputStream);
    inputStream.close();
  }
  trace.info() << "\t from a digital set " << endl;
  {
    // digital set: diamond of radius 30 centered at the origin
    Point o( 0, 0 );
    Domain domain( lowerBound, upperBound );
    DigitalSet set( domain );
    for ( Domain::ConstIterator it = domain.begin(); it != domain.end(); ++it )
    {
     if ( (*it - o ).norm1() <= 30 ) set.insertNew( *it );
    }
    
    vector<SCell> contour;                           //contour
    SurfelAdjacency<K2::dimension> sAdj( true );     //adjacency
    //tracking and init grid curve
    SCell s = Surfaces<KSpace>::findABel( ks, set, 1000 );
    Surfaces<KSpace>::track2DBoundary( contour, ks, sAdj, set, s );
    c2.initFromSCellsVector( contour );
  }
  
  trace.info() << "\t from a FreemanChain (from a file) " << endl; 
  {
    fstream inputStream;
    inputStream.open (S.c_str(), ios::in);
    FreemanChain<int> fc(inputStream);
    inputStream.close();
    Curve c; 
    c.initFromPointsRange( fc.begin(), fc.end() ); 
  }
  trace.emphase() << "Output" << endl;
  trace.info() << "\t standard output " << endl;
  {
    trace.info() << c1 << std::endl;
  }
  trace.info() << "\t into a data file " << endl;
  {
    ofstream outputStream("myGridCurve.dat"); 
    if (outputStream.is_open()) 
      c2.writeVectorToStream(outputStream);
    outputStream.close();
  }
  trace.info() << "\t into a vector graphics file " << endl;
  {
    Board2D aBoard;
    aBoard.setUnit(Board2D::UCentimeter);
    aBoard << c2; 
    aBoard.saveEPS( "myGridCurve.eps", Board2D::BoundingBox, 5000 );
  }
  
  trace.info() << "\t into a FreemanChain " << endl; 
  {
    typedef FreemanChain<Curve::KSpace::Integer> FreemanChain; 
    FreemanChain fc;
    FreemanChain::readFromPointsRange( c1.getPointsRange(), fc ); 
    trace.info() << "\t" << fc << endl;
  }
  
  trace.emphase() << "Ranges Ouput" << endl;
  {
    Board2D aBoard;
    aBoard.setUnit(Board2D::UCentimeter);
    Point low(-1,-1);
    Point up(3,3);
    Domain aDomain( low,up );
    {//1cellsRange
      Curve::SCellsRange r = c1.getSCellsRange(); 
      
      trace.info() << r << endl;
      
      aBoard << SetMode(aDomain.className(), "Grid") << aDomain; 
      aBoard << r; 
      aBoard.saveEPS( "My1CellsRange.eps", Board2D::BoundingBox, 5000 );
      aBoard.clear(); 
    }
    {//IncidentPointsRange
      Curve::IncidentPointsRange r = c1.getIncidentPointsRange(); 
      
      trace.info() << r << endl;
      
      aBoard << SetMode(aDomain.className(), "Grid") << aDomain; 
      aBoard << r; 
      aBoard.saveEPS( "MyIncidentPointsRange.eps", Board2D::BoundingBox, 5000 );
      aBoard.clear(); 
    }
    {//CodesRange
      Curve::CodesRange r = c1.getCodesRange(); 
      
      trace.info() << r << endl;
    }
  }
  
  trace.emphase() << "Ranges Iterators" << endl;
  {
    typedef Curve::CodesRange Range; 
    Range r = c1.getCodesRange(); 
    
    trace.info() << "\t iterate over the range" << endl;
    Range::ConstIterator it = r.begin(); 
    Range::ConstIterator itEnd = r.end(); 
    for ( ; it != itEnd; ++it)
    {
      trace.info() << *it;
    }
    trace.info() << endl;
    
    trace.info() << "\t iterate over the range in the reverse way" << endl;
    Range::ConstReverseIterator rit = r.rbegin(); 
    Range::ConstReverseIterator ritEnd = r.rend(); 
    for ( ; rit != ritEnd; ++rit) 
    {
      trace.info() << *rit;
    }
    trace.info() << endl;
      
    trace.info() << "\t iterate over the range in a circular way" << endl;
    Range::ConstCirculator c = r.c();
    //set the starting element wherever you want... 
    for (unsigned i = 0; i < 20; ++i) ++c; 
    //... and circulate
    Range::ConstCirculator cend( c );
    do 
    {
      trace.info() << *c;
      c++;
    } while (c!=cend);
    trace.info() << endl;
    
    trace.info() << "\t Generic function working with any (circular)iterator" << endl;
    displayAll<Range::ConstIterator>(r.begin(),r.end()); 
    displayAll<Range::ConstReverseIterator>(r.rbegin(),r.rend()); 
    displayAll<Range::ConstCirculator>(r.c(),r.c()); 
    
  }
  
  trace.endBlock();
  return 0;
}
//           
