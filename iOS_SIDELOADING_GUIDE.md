# iOS Sideloading Guide for Meshtastic Compass

This guide will walk you through sideloading the Meshtastic Compass app onto your iPhone using various methods.

## Prerequisites

### Required Software
- **macOS** (required for Xcode and iOS development)
- **Xcode** (latest version from Mac App Store)
- **Node.js** (v16 or higher)
- **React Native CLI**: `npm install -g react-native-cli`
- **CocoaPods**: `sudo gem install cocoapods`

### Apple Developer Account
- **Free Apple ID** (for 7-day sideloading)
- **Paid Apple Developer Account** ($99/year for 1-year sideloading)

## Method 1: Xcode Development (Recommended)

### Step 1: Setup Development Environment

1. **Install Xcode** from Mac App Store
2. **Install Command Line Tools**:
   ```bash
   xcode-select --install
   ```

3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

4. **Install iOS dependencies**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Step 2: Configure Xcode Project

1. **Open Xcode project**:
   ```bash
   open ios/MeshtasticCompass.xcworkspace
   ```

2. **Set up your Apple ID**:
   - Go to Xcode → Preferences → Accounts
   - Add your Apple ID
   - Sign in and trust the certificate

3. **Configure Bundle Identifier**:
   - Select the project in Xcode
   - Go to "Signing & Capabilities"
   - Change Bundle Identifier to something unique (e.g., `com.yourname.meshtasticcompass`)
   - Select your Apple ID team

### Step 3: Build and Install

1. **Connect your iPhone** via USB
2. **Trust the computer** on your iPhone when prompted
3. **Select your device** in Xcode's device dropdown
4. **Build and run**:
   - Click the "Play" button in Xcode, or
   - Run: `npm run ios`

5. **Trust the developer** on your iPhone:
   - Go to Settings → General → VPN & Device Management
   - Find your Apple ID and tap "Trust"

### Step 4: Enable Developer Mode (iOS 16+)

If you're using iOS 16 or later:
1. Go to **Settings → Privacy & Security → Developer Mode**
2. Toggle **Developer Mode** ON
3. Restart your iPhone
4. Confirm you want to enable Developer Mode

## Method 2: AltStore (No Mac Required) - RECOMMENDED FOR WINDOWS

### Prerequisites
- Windows PC with iTunes installed
- AltStore downloaded from [altstore.io](https://altstore.io)
- GitHub account (for automated builds)

### Step 1: Install AltStore

1. **Download AltStore** from [altstore.io](https://altstore.io)
2. **Install AltServer** on your PC
3. **Connect your iPhone** to your PC
4. **Install AltStore** on your iPhone through AltServer

### Step 2: Set Up Automated iOS Builds (GitHub Actions)

Since you're on Windows, you'll use GitHub Actions to automatically build the iOS app:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add iOS build workflow"
   git push origin main
   ```

2. **Go to your GitHub repository** → Actions tab
3. **The workflow will automatically run** and build the iOS app
4. **Download the IPA file** from the Actions artifacts

### Step 3: Sideload with AltStore

1. **Open AltStore** on your iPhone
2. **Tap the "+" button**
3. **Select your IPA file** (downloaded from GitHub Actions)
4. **Enter your Apple ID** when prompted
5. **Wait for installation**

### Step 4: Trust the Developer

1. **Go to Settings** → General → VPN & Device Management
2. **Find your Apple ID** and tap "Trust"
3. **Confirm** you want to trust the developer

## Method 3: Sideloadly (Windows/Linux)

### Step 1: Download Sideloadly

1. **Download Sideloadly** from [sideloadly.io](https://sideloadly.io)
2. **Install the software**

### Step 2: Prepare the App

1. **Build the app** using Xcode or GitHub Actions
2. **Export as IPA** file

### Step 3: Sideload

1. **Open Sideloadly**
2. **Connect your iPhone**
3. **Drag and drop the IPA file**
4. **Enter your Apple ID**
5. **Click "Start"**

## Method 4: GitHub Actions (Automated Build)

### Step 1: Set up GitHub Actions

1. **Create `.github/workflows/ios-build.yml`**:
   ```yaml
   name: Build iOS App
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     build:
       runs-on: macos-latest
       steps:
         - uses: actions/checkout@v3
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm install
         - name: Install iOS dependencies
           run: |
             cd ios
             pod install
         - name: Build iOS app
           run: |
             cd ios
             xcodebuild -workspace MeshtasticCompass.xcworkspace -scheme MeshtasticCompass -configuration Release -destination generic/platform=iOS -archivePath MeshtasticCompass.xcarchive archive
         - name: Export IPA
           run: |
             xcodebuild -exportArchive -archivePath ios/MeshtasticCompass.xcarchive -exportPath ios/export -exportOptionsPlist ios/ExportOptions.plist
         - name: Upload IPA
           uses: actions/upload-artifact@v3
           with:
             name: meshtastic-compass-ios
             path: ios/export/MeshtasticCompass.ipa
   ```

### Step 2: Download and Install

1. **Go to Actions tab** in your GitHub repository
2. **Download the IPA** from the latest build
3. **Use AltStore or Sideloadly** to install

## Troubleshooting

### Common Issues

1. **"Untrusted Developer"**:
   - Go to Settings → General → VPN & Device Management
   - Trust your Apple ID

2. **"App Installation Failed"**:
   - Check if you have enough storage space
   - Restart your iPhone
   - Try a different Apple ID

3. **"Device Not Supported"**:
   - Ensure your iPhone is running iOS 11.0 or later
   - Check the deployment target in Xcode

4. **"Provisioning Profile Error"**:
   - Update your Apple ID in Xcode
   - Clean and rebuild the project

### Certificate Issues

1. **Certificate Expired**:
   - Go to Xcode → Preferences → Accounts
   - Download Manual Profiles
   - Clean and rebuild

2. **"No Valid Provisioning Profile"**:
   - Change Bundle Identifier to something unique
   - Select your Apple ID team
   - Let Xcode automatically manage signing

## App Refresh (Free Apple ID)

- **Free Apple ID**: Apps expire after 7 days
- **Paid Developer Account**: Apps expire after 1 year
- **Refresh**: Re-sideload the app before expiration

## Security Considerations

1. **Only install from trusted sources**
2. **Keep your Apple ID secure**
3. **Don't share your provisioning profiles**
4. **Regularly update the app**

## Alternative: TestFlight (Recommended for Distribution)

For easier distribution to multiple devices:

1. **Upload to App Store Connect**
2. **Add testers via TestFlight**
3. **No sideloading required**
4. **90-day testing period**

## Support

If you encounter issues:

1. **Check the troubleshooting section**
2. **Review Xcode console logs**
3. **Ensure all dependencies are installed**
4. **Try a clean build**

## Legal Notice

- Only sideload apps you own or have permission to install
- Respect Apple's terms of service
- Don't use for malicious purposes
- Consider TestFlight for public distribution
