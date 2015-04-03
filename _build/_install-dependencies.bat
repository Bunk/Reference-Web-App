@echo off

call npm install --global bower
call npm install --global gulp

cd..
call bower install
call npm install -d

pause
