#!/bin/bash

# Development script for Jekyll site
echo "🚀 Starting Jekyll development server..."

# Check if we're in the right directory
if [ ! -f "_config.yml" ]; then
    echo "❌ Error: _config.yml not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if needed
if [ ! -d ".bundle" ]; then
    echo "📦 Installing dependencies..."
    bundle install
fi

# Start the development server
echo "🌐 Starting server at http://localhost:4000"
echo "📝 Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --livereload --host 0.0.0.0
