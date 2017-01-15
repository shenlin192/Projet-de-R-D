#include "iostream"
#include "string"
#include <fstream>
#include <vector>
#include <boost/timer.hpp>
#include <boost/progress.hpp>

using namespace boost;

/**
 *   * timer simple and useful, suitable for short time task.
 *       * Do not use it to calculate time for long time.
 *           * For long time calculate check date_time lib
 *               */
using boost::timer;

void testBoost(){
	timer t;                        // declare timer 		start counting
	std::cout << "max timespan:" << t.elapsed_max() / 3600 << "h" << std::endl;
	std::cout << "min timespan:" << t.elapsed_min() << "s" <<  std::endl;
	std::cout << "now time elapsed:" << t.elapsed() << "s" << std::endl;
	
	
	std::vector<std::string> v(100);
	std::ofstream fs("test.txt");
	progress_display pd(v.size());					// 构造函数，传入进度总数

	std::vector<std::string>::iterator pos;
	
	for (pos = v.begin(); pos != v.end(); ++pos){	// 遍历迭代，处理字符串，写文件
    	fs << *pos << std::endl;
    	++pd;										// 更新进度
	}
	
	//return 0;
}
