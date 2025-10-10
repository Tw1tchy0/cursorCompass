import { BleManager, Device, State } from 'react-native-ble-plx';

export default class BluetoothManager {
  private manager: BleManager;
  private connectedDevice: Device | null = null;

  constructor() {
    this.manager = new BleManager();
  }

  async scanAndConnect(): Promise<Device | null> {
    try {
      // Check if Bluetooth is enabled
      const state = await this.manager.state();
      if (state !== State.PoweredOn) {
        throw new Error('Bluetooth is not enabled');
      }

      // Scan for T-Beam devices
      const devices = await this.scanForTBeamDevices();
      
      if (devices.length === 0) {
        throw new Error('No T-Beam devices found');
      }

      // Connect to the first available T-Beam device
      const device = devices[0];
      await this.connectToDevice(device);
      
      return device;
    } catch (error) {
      console.error('Failed to scan and connect:', error);
      throw error;
    }
  }

  private async scanForTBeamDevices(): Promise<Device[]> {
    return new Promise((resolve, reject) => {
      const devices: Device[] = [];
      const scanTimeout = 10000; // 10 seconds

      const subscription = this.manager.startDeviceScan(
        null, // Scan for all devices
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            subscription.remove();
            reject(error);
            return;
          }

          if (device && this.isTBeamDevice(device)) {
            devices.push(device);
          }
        }
      );

      // Stop scanning after timeout
      setTimeout(() => {
        subscription.remove();
        resolve(devices);
      }, scanTimeout);
    });
  }

  private isTBeamDevice(device: Device): boolean {
    // Check for T-Beam specific characteristics
    const name = device.name || '';
    const localName = device.localName || '';
    
    // Common T-Beam device identifiers
    const tBeamIdentifiers = [
      'T-Beam',
      'Meshtastic',
      'TTGO',
      'ESP32'
    ];

    return tBeamIdentifiers.some(identifier => 
      name.toLowerCase().includes(identifier.toLowerCase()) ||
      localName.toLowerCase().includes(identifier.toLowerCase())
    );
  }

  private async connectToDevice(device: Device): Promise<void> {
    try {
      this.connectedDevice = await device.connect();
      await this.connectedDevice.discoverAllServicesAndCharacteristics();
      
      console.log('Connected to T-Beam device:', device.name || device.id);
    } catch (error) {
      console.error('Failed to connect to device:', error);
      throw error;
    }
  }

  async sendLocationData(latitude: number, longitude: number): Promise<void> {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // This would send location data to the T-Beam device
      // The exact implementation depends on the T-Beam's Bluetooth service
      const locationData = {
        latitude,
        longitude,
        timestamp: Date.now()
      };

      // Convert to bytes and send via Bluetooth
      const data = JSON.stringify(locationData);
      const buffer = Buffer.from(data, 'utf8');
      
      // Send to the appropriate characteristic
      // This is a placeholder - actual implementation would depend on T-Beam's BLE service
      console.log('Sending location data:', locationData);
    } catch (error) {
      console.error('Failed to send location data:', error);
      throw error;
    }
  }

  async receiveLocationData(): Promise<{latitude: number, longitude: number} | null> {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // This would receive location data from the T-Beam device
      // The exact implementation depends on the T-Beam's Bluetooth service
      
      // For now, return null - this would be implemented based on T-Beam's BLE characteristics
      return null;
    } catch (error) {
      console.error('Failed to receive location data:', error);
      return null;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connectedDevice) {
      try {
        await this.connectedDevice.cancelConnection();
        this.connectedDevice = null;
        console.log('Disconnected from T-Beam device');
      } catch (error) {
        console.error('Failed to disconnect:', error);
      }
    }
  }

  isConnected(): boolean {
    return this.connectedDevice !== null;
  }

  getConnectedDevice(): Device | null {
    return this.connectedDevice;
  }
}
