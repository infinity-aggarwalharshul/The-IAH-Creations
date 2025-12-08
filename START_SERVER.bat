@echo off
REM IAH Creations Website - Local Development Server
REM This script starts a local web server to run the website

echo ========================================
echo   IAH Creations - Local Dev Server
echo ========================================
echo.
echo Starting Python HTTP server on port 8000...
echo.
echo Once started, open your browser and visit:
echo   http://localhost:8000/index.html
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause
