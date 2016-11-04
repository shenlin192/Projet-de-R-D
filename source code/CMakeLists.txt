PROJECT(Helloworld)
#Required in DGtal
CMAKE_MINIMUM_REQUIRED(VERSION 2.6)

FIND_PACKAGE(DGtal REQUIRED)

#message(${DGTAL_INCLUDE_DIRS}) /usr/local/include/usr/include
#message(${DGTAL_LIBRARY_DIRS}) /usr/local/lib
#message(${DGTAL_LIBRARIES}) DGtalDGtalIO

INCLUDE_DIRECTORIES(${DGTAL_INCLUDE_DIRS})
LINK_DIRECTORIES(${DGTAL_LIBRARY_DIRS})

#ADD_EXECUTABLE(targetfile sourcefile) generate .exe
#ADD_EXECUTABLE(helloworld helloworld)
#TARGET_LINK_LIBRARIES(helloworld ${DGTAL_LIBRARIES})

#ADD_LIBRARY(targetfile sourcefile) generate .so
ADD_LIBRARY(helloworldLib SHARED ./cpp/helloworld)
TARGET_LINK_LIBRARIES(helloworldLib ${DGTAL_LIBRARIES})

ADD_LIBRARY(templateExampleLib SHARED ./cpp/templateExample)
TARGET_LINK_LIBRARIES(templateExampleLib ${DGTAL_LIBRARIES})

