# Meshtastic Compass App

A React Native mobile application that connects to Meshtastic T-Beam units via Bluetooth and displays a compass pointing to the other unit in real-time.

## Features

- **Bluetooth Connectivity**: Connects to Meshtastic T-Beam units via Bluetooth
- **Real-time Compass**: Displays a compass with a dot pointing to the other T-Beam unit
- **Location Tracking**: Uses GPS to track your current location
- **Mesh Network Communication**: Receives location data from other T-Beam units through the mesh network
- **Distance & Bearing**: Shows distance and bearing to the other unit
- **Real-time Updates**: Updates compass position as you move and rotate your phone

## Requirements

- React Native development environment
- Android device with Bluetooth and GPS capabilities
- Two Meshtastic T-Beam units
- Android 6.0+ (API level 23+)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd meshtastic-compass
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install React Native CLI** (if not already installed):
   ```bash
   npm install -g react-native-cli
   ```

4. **For Android development**:
   - Install Android Studio
   - Set up Android SDK
   - Configure environment variables

## Setup

### Android Setup

1. **Enable Developer Options** on your Android device
2. **Enable USB Debugging**
3. **Connect your device** via USB or use an emulator

### T-Beam Configuration

1. **Flash Meshtastic firmware** on both T-Beam units
2. **Configure mesh network** settings
3. **Enable Bluetooth** on both units
4. **Set up location sharing** in the mesh network

## Usage

1. **Start the app** on your phone
2. **Grant permissions** for location, Bluetooth, and storage
3. **Connect to T-Beam** by tapping "Connect to T-Beam"
4. **Wait for connection** to the other T-Beam unit
5. **Use the compass** to navigate to the other unit

## Technical Details

### Architecture

- **React Native**: Cross-platform mobile development
- **Bluetooth Low Energy**: Communication with T-Beam units
- **GPS Location Services**: Real-time location tracking
- **Mesh Network**: Communication between T-Beam units
- **Compass UI**: Real-time compass with target positioning

### Key Components

- `App.tsx`: Main application component
- `Compass.tsx`: Compass UI component with SVG rendering
- `BluetoothManager.ts`: Bluetooth communication service
- `LocationManager.ts`: GPS location tracking service
- `MeshtasticService.ts`: Main service coordinating all functionality

### Permissions Required

- `ACCESS_FINE_LOCATION`: High-accuracy GPS location
- `ACCESS_COARSE_LOCATION`: Approximate location
- `BLUETOOTH`: Bluetooth communication
- `BLUETOOTH_CONNECT`: Connect to Bluetooth devices
- `BLUETOOTH_SCAN`: Scan for Bluetooth devices

## Development

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Building for Production

```bash
# Android
cd android
./gradlew assembleRelease

# iOS
cd ios
xcodebuild -workspace MeshtasticCompass.xcworkspace -scheme MeshtasticCompass -configuration Release
```

## Troubleshooting

### Common Issues

1. **Bluetooth not connecting**:
   - Ensure T-Beam units are powered on
   - Check Bluetooth is enabled on both devices
   - Verify T-Beam units are in pairing mode

2. **Location not updating**:
   - Check GPS permissions are granted
   - Ensure location services are enabled
   - Test in an open area with good GPS signal

3. **Compass not pointing correctly**:
   - Calibrate device compass
   - Ensure device is held flat
   - Check for magnetic interference

### Debug Mode

Enable debug logging by setting `__DEV__ = true` in the app configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the troubleshooting section
- Review the Meshtastic documentation
- Open an issue on GitHub

## Future Enhancements

- [ ] Multiple T-Beam unit support
- [ ] Offline mode with cached locations
- [ ] Custom compass themes
- [ ] Voice navigation
- [ ] History tracking
- [ ] Export location data
