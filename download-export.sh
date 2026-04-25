#!/bin/bash
# UVB-KnightBot - Complete Export Download Script
# This script downloads the exported project files from the workspace

echo "=== UVB-KnightBot Export Downloader ==="
echo ""

# The workspace path
WORKSPACE="/workspace/d611983a-6600-4037-bb40-4f69390fdee2/sessions/agent_bc462f5c-8ba1-414c-99b3-8cd9b77208ce"

# Check if we can access the files
if [ -f "$WORKSPACE/UVB-KnightBot-Complete-Deployment.zip" ]; then
    echo "Found complete deployment archive (172 MB with node_modules)"
    cp "$WORKSPACE/UVB-KnightBot-Complete-Deployment.zip" ./UVB-KnightBot-Complete-Deployment.zip
    echo "Copied: UVB-KnightBot-Complete-Deployment.zip (172 MB)"
else
    echo "Creating fresh export from workspace..."
    cd "$WORKSPACE"
    zip -r /tmp/UVB-KnightBot-Complete-Deployment.zip . -x ".kilocode/*" "*.zip" "UVB-KnightBot-Session-Log.md" ".git/*"
    cp /tmp/UVB-KnightBot-Complete-Deployment.zip ./
    echo "Created: UVB-KnightBot-Complete-Deployment.zip"
fi

if [ -f "$WORKSPACE/UVB-KnightBot-Session-Log.md" ]; then
    cp "$WORKSPACE/UVB-KnightBot-Session-Log.md" ./
    echo "Copied: UVB-KnightBot-Session-Log.md"
fi

echo ""
echo "=== Files ready in current directory ==="
ls -lh UVB-KnightBot-*.zip UVB-KnightBot-Session-Log.md 2>/dev/null || echo "Files not found"
echo ""
echo "To use:"
echo "1. Extract: unzip UVB-KnightBot-Complete-Deployment.zip"
echo "2. cd UVB-KnightBot-Complete-Deployment"
echo "3. Run: bun dev (development) or bun build && bun start (production)"
echo ""
echo "Note: If running on a remote server, ensure Node.js 18+ and Bun are installed."
