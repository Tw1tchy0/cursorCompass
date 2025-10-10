@echo off
echo Setting up GitHub Actions for iOS builds...
echo.

echo Step 1: Initialize Git repository (if not already done)
if not exist .git (
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

echo.
echo Step 2: Add all files to Git
git add .

echo.
echo Step 3: Commit changes
git commit -m "Add iOS build workflow and project files"

echo.
echo Step 4: Add remote origin (you'll need to create a GitHub repository first)
echo Please create a new repository on GitHub and then run:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo git push -u origin main

echo.
echo After pushing to GitHub:
echo 1. Go to your repository on GitHub
echo 2. Click on the "Actions" tab
echo 3. The iOS build workflow will automatically run
echo 4. Download the IPA file from the artifacts
echo 5. Use AltStore to install the IPA on your iPhone

echo.
echo Setup complete! Follow the instructions above to build and install your app.
pause
