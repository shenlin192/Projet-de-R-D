#include <iostream>
#include <sstream>
using namespace std;

//definition of a class template
template<class T> class RectangleT {
  private:
    T width, height;

  public:
    RectangleT (T, T);
    T area ();
    T perimeter ();
};

//definition of the constructor in a template class
template<class T> RectangleT<T>::RectangleT (T a, T b) {
	  width = a;
	  height = b;
}

template <class T>
T RectangleT<T>::area(){
	return width*height;
}

template <class T>
T RectangleT<T>::perimeter(){
	return (width+height)*2;
}





