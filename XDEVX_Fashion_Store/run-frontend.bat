@echo off
cd /d "%~dp0frontend"
if not exist package.json (
  echo ERROR: frontend\package.json was not found.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing frontend dependencies for the first run...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
call npm run dev
pause
