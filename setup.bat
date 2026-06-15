@echo off
REM Learning Tracker - Quick Setup Script (Windows)
REM This script installs all dependencies and sets up the project

echo.
echo 🚀 Learning Tracker - Setup Script
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install client dependencies
echo.
echo 📦 Installing client dependencies...
cd client
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)

cd ..

REM Install server dependencies
echo.
echo 📦 Installing server dependencies...
cd server
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)

REM Setup environment file
if not exist .env (
    echo.
    echo ⚙️  Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please edit server/.env with your MongoDB URI
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📖 Next steps:
echo 1. Edit server/.env with your MongoDB connection string
echo 2. Make sure MongoDB is running
echo 3. Run: npm run dev
echo.
echo 🌐 Access the app at http://localhost:3000
echo.
pause
