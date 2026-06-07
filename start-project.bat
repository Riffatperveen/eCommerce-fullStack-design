@echo off
color 0B
echo =======================================================
echo          Starting E-Commerce Fullstack Project          
echo =======================================================
echo.

echo [1/2] Starting Node.js Backend Server (Port 5000)
echo Note: This will spin up the In-Memory Database automatically.
start "E-Commerce Backend" cmd /k "cd backend && npm run dev"

echo.
echo [2/2] Starting Vite Frontend Server (Port 5173)
start "E-Commerce Frontend" cmd /k "cd ecommerce-websites && npm run dev"

echo.
echo =======================================================
echo Both servers are starting up in separate windows!
echo You can minimize this window.
echo =======================================================
pause
