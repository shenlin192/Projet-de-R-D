%module "mylib"

%{
#include "global.h"
#include "rectangle.h"
#include "TestBoost.h"
#include "templateExample.h"
%}

%include "global.h";
%include "rectangle.h";
%include "TestBoost.h";
%include "templateExample.h"
%template (intRectangle) RectangleT<int>;
%template (floatRectangle) RectangleT<float>;

 extern double My_variable;
 extern int fact(int n);
 extern int my_mod(int x, int y);
 extern char *get_time();
