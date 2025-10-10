#!/bin/bash

echo "Building iOS app for AltStore..."

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Install iOS dependencies
echo "Installing iOS dependencies..."
cd ios
pod install
cd ..

# Build the app
echo "Building iOS app..."
npx react-native run-ios --configuration Release

# Create IPA file
echo "Creating IPA file..."
cd ios
xcodebuild -workspace MeshtasticCompass.xcworkspace \
  -scheme MeshtasticCompass \
  -configuration Release \
  -destination generic/platform=iOS \
  -archivePath MeshtasticCompass.xcarchive \
  archive

# Export IPA
xcodebuild -exportArchive \
  -archivePath MeshtasticCompass.xcarchive \
  -exportPath ./export \
  -exportOptionsPlist ExportOptions.plist

echo "IPA file created at: ios/export/MeshtasticCompass.ipa"
echo "You can now use this IPA file with AltStore!"
