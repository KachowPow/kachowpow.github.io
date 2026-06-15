#!/bin/bash

# Learning Tracker - Quick Setup Script
# This script installs all dependencies and sets up the project

echo "🚀 Learning Tracker - Setup Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install root dependencies"
    exit 1
fi

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi

cd ..

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Setup environment file
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please edit server/.env with your MongoDB URI"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Edit server/.env with your MongoDB connection string"
echo "2. Make sure MongoDB is running"
echo "3. Run: npm run dev"
echo ""
echo "🌐 Access the app at http://localhost:3000"
