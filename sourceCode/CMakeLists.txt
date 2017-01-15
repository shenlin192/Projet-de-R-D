PROJECT(Helloworld)
#Required in DGtal
CMAKE_MINIMUM_REQUIRED(VERSION 2.6)

FIND_PACKAGE(DGtal REQUIRED)

#message(${DGTAL_INCLUDE_DIRS}) /usr/local/include/usr/include
#message(${DGTAL_LIBRARY_DIRS}) /usr/local/lib
#message(${DGTAL_LIBRARIES}) DGtalDGtalIO

INCLUDE_DIRECTORIES(${DGTAL_INCLUDE_DIRS})
LINK_DIRECTORIES(${DGTAL_LIBRARY_DIRS})


#The command "set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve")" changes the default output path, which is "build"
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve/bin")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve/bin")
add_executable(GridCurve ./cpp/GridCurve/GridCurve)
target_link_libraries(GridCurve ${DGTAL_LIBRARIES})

# copy the smallSquare from source to build
configure_file(./cpp/GridCurve/smallSquare.dat ${CMAKE_BINARY_DIR}/GridCurve/bin COPYONLY)

#add_library(GridCurveLib SHARED ./cpp/helloworld)
#target_link_libraries(GridCurveLib ${DGTAL_LIBRARIES})








if(FALSE)
#The command "add_executable(targetfile sourcefile)" generates ".exe" files
add_executable(helloworld ./cpp/helloworld)
target_link_libraries(helloworld ${DGTAL_LIBRARIES})

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/notemplate")
add_executable(notemplate ./cpp/notemplate)
target_link_libraries(notemplate ${DGTAL_LIBRARIES})
endif()



if(FALSE)
#command add_library(targetfile type sourcefile) generates ".so" files
add_library(helloworldLib SHARED ./cpp/helloworld)
target_link_libraries(helloworldLib ${DGTAL_LIBRARIES})

add_library(templateExampleLib SHARED ./cpp/templateExample)
target_link_libraries(templateExampleLib ${DGTAL_LIBRARIES})

add_library(notemplateLib SHARED ./cpp/notemplate)
target_link_libraries(notemplateLib)

add_library(testBoostLib SHARED ./cpp/testBoost)
target_link_libraries(testBoostLib ${DGTAL_LIBRARIES})
endif()
