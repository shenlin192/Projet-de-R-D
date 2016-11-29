#include "iostream"
#include "string"
#include <fstream>
#include <vector>
#include <boost/timer.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/date_time/gregorian/gregorian.hpp>
#include <boost/smart_ptr.hpp>
#include <boost/array.hpp>
//#include <boost/progress.hpp>

class MyClass {
        int myNumber;
public:
        MyClass(int number): myNumber(number){}
        
        void sayHello() {
            std::cout << "Hello, my number is:" << myNumber <<std::endl;
        }
       
        void boostTimer(){
        	boost::timer t;                        // declare timer 		start counting
			std::cout << "max timespan:" << t.elapsed_max() / 3600 << "h" << std::endl;
			std::cout << "min timespan:" << t.elapsed_min() << "s" <<  std::endl;
			std::cout << "now time elapsed:" << t.elapsed() << "s" << std::endl;
        
        }
        
       
	    void boostLexicalCast(){
	    	using namespace std;
	    	string str = boost::lexical_cast<string>(123);	
	    	cout << str << endl;
	    }
    
        
	    void boostDate(){
	    	using namespace boost::gregorian;
	    	date d0 = from_string("1999-12-31");
	    	date d1(2010,1,1);
	    	date d2(2000, Jan, 1);
	    	std::cout << d0 << std::endl;		    	
	    }
	    
        
};
