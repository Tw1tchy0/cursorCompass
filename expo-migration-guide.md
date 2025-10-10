# Expo Migration Guide for Meshtastic Compass

Since the native React Native build is having dependency conflicts, here's how to migrate to Expo for easier iOS builds and AltStore deployment.

## Why Expo?

- ✅ **No CocoaPods issues** - Expo handles all native dependencies
- ✅ **Easy iOS builds** - Works on any platform
- ✅ **Simple AltStore deployment** - One command to create IPA
- ✅ **Same React Native code** - Minimal changes needed

## Migration Steps

### 1. Install Expo CLI
```bash
npm install -g @expo/cli
```

### 2. Initialize Expo in your project
```bash
npx create-expo-app --template blank-typescript MeshtasticCompassExpo
cd MeshtasticCompassExpo
```

### 3. Copy your source code
```bash
# Copy your components
cp -r ../src/components/* src/
cp -r ../src/services/* src/

# Copy your main App.tsx
cp ../App.tsx App.tsx
```

### 4. Install dependencies
```bash
npm install react-native-ble-plx
npm install react-native-sensors
npm install react-native-svg
npm install react-native-permissions
npm install react-native-geolocation-service
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
```

### 5. Build for iOS
```bash
# Build for iOS (creates IPA file)
npx expo build:ios --type archive
```

### 6. Download IPA
- Go to https://expo.dev
- Find your build
- Download the IPA file
- Use with AltStore

## Benefits

1. **No more CocoaPods issues**
2. **Builds work on Windows**
3. **Automatic dependency management**
4. **Easy updates and deployment**
5. **Same React Native codebase**

## Alternative: Use EAS Build

For even easier builds:

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

This creates a production-ready IPA file that works perfectly with AltStore!
