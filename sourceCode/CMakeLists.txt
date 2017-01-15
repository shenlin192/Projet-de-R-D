############## General configuration ############
PROJECT(PRED)
#Required in DGtal
CMAKE_MINIMUM_REQUIRED(VERSION 2.6)

FIND_PACKAGE(DGtal REQUIRED)

#message(${DGTAL_INCLUDE_DIRS}) /usr/local/include/usr/include
#message(${DGTAL_LIBRARY_DIRS}) /usr/local/lib
#message(${DGTAL_LIBRARIES}) DGtalDGtalIO

INCLUDE_DIRECTORIES(${DGTAL_INCLUDE_DIRS})
LINK_DIRECTORIES(${DGTAL_LIBRARY_DIRS})


############## BasicUsage examination ################
set(name "BasicUsage")
## BasicUsage library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/${name}/lib)
add_library(${name}Lib SHARED ./${name}/${name})
target_link_libraries(${name}Lib ${DGTAL_LIBRARIES})


############## Template examination ################
set(name "Template")
## BasicUsage library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/${name}/lib)
add_library(${name}Lib SHARED ./${name}/${name})
target_link_libraries(${name}Lib ${DGTAL_LIBRARIES})


############## Boost examination ################
set(name "Boost")
## BasicUsage library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/${name}/lib)
add_library(${name}Lib SHARED ./${name}/${name})
target_link_libraries(${name}Lib ${DGTAL_LIBRARIES})


############## 2DPoints examination ################
set(name "2DPoints")

## BasicUsage library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/${name}/lib)
add_library(${name}Lib SHARED ./${name}/${name})
target_link_libraries(${name}Lib ${DGTAL_LIBRARIES})












if(FALSE)
############## Hello world project ################
set(name "HelloWorld")

## GridCurve executable
#create a container for GridCurve project
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/bin")
#replace the default output of executable (build) with a customized path
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/bin")
add_executable(${name} ./${name}/${name})
target_link_libraries(${name} ${DGTAL_LIBRARIES})

## Hello world library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/${name}/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/${name}/lib)
add_library(${name}Lib SHARED ./HelloWorld/HelloWorld)
target_link_libraries(${name}Lib ${DGTAL_LIBRARIES})



############## GridCurve project ################

## GridCurve executable
#create a container for GridCurve project
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve/bin")
#replace the default output of executable (build) with a customized path
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve/bin")
add_executable(GridCurve ./GridCurve/GridCurve)
target_link_libraries(GridCurve ${DGTAL_LIBRARIES})
# copy the resources from source code to the project
configure_file(./cpp/GridCurve/smallSquare.dat ${CMAKE_BINARY_DIR}/GridCurve/bin COPYONLY)

## GridCurve library
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/GridCurve/lib")
#replace the default output of shared library (build) with a customized path
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR}/GridCurve/lib)
add_library(GridCurveLib SHARED ./helloworld)
target_link_libraries(GridCurveLib ${DGTAL_LIBRARIES})
configure_file(./cpp/GridCurve/smallSquare.dat ${CMAKE_BINARY_DIR}/GridCurve/lib COPYONLY)
endif()






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
