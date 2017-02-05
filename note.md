# Problems
1. FFI can not find the DGtal 2D point constructor symble `SyntaxError: Unexpected identifier`
2. Can not install llvm (collect2 error ld terminated with signal 9 killed)
[Your virtual machine does not have enough memory to perform the linking phas](http://stackoverflow.com/questions/5682854/why-is-the-linker-terminating-on-me-when-i-build-clang)

# Static library
Impossible to link static library with NodeJs

# Add new disk into root

1. `$ df -h` list disk usage
2. `$ mkfs -t ext4 /${disk you want formatting}`
3. `$ gedit /etc/fstab`
add a line in the end
${disk you want formatting} (eg. /dev/sda6)    ${output path} (eg. /home/open)      ext4    defaults        0      1

http://www.linuxidc.com/Linux/2012-10/72814.htm

# Add swap space

0. `$ swapon -s`
1. `$ dd if=/dev/zero of=/swapfile bs=1024 count=${number of Bytes}` 
2. `$ mkswap /swapfile`
3. `$ swapon /swapfile`
http://icooke.blog.51cto.com/4123148/815598

# Disk usage analyse

`$ baobab`


