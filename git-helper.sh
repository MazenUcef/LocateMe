#!/bin/bash

# Interactive Git Helper Script

# Ask for commit message
read -p "Enter your commit message: " commit_message

# Add changes
git add .

# Commit with message
git commit -m "$commit_message"

# Push to main branch
git push origin main

# Confirmation message
echo "✅ Changes have been pushed to the main branch!"
