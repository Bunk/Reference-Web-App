@echo off

call npm install --global yo gulp bower
call npm install --global generator-gulp-angular

cd..
call bower install
call npm install -d

pause
