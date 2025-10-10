import BluetoothManager from './BluetoothManager';
import LocationManager, { LocationData } from './LocationManager';

export interface MeshtasticNode {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastSeen: Date;
  distance: number;
  bearing: number;
}

export default class MeshtasticService {
  private bluetoothManager: BluetoothManager;
  private locationManager: LocationManager;
  private nodes: Map<string, MeshtasticNode> = new Map();
  private currentLocation: LocationData | null = null;
  private onNodeUpdate?: (nodes: MeshtasticNode[]) => void;

  constructor() {
    this.bluetoothManager = new BluetoothManager();
    this.locationManager = new LocationManager();
  }

  async initialize(): Promise<void> {
    try {
      // Connect to T-Beam device
      await this.bluetoothManager.scanAndConnect();
      
      // Start location tracking
      this.startLocationTracking();
      
      // Start receiving mesh data
      this.startMeshDataReception();
      
      console.log('Meshtastic service initialized');
    } catch (error) {
      console.error('Failed to initialize Meshtastic service:', error);
      throw error;
    }
  }

  private startLocationTracking(): void {
    this.locationManager.watchPosition(
      (position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        // Send our location to the mesh network
        this.sendLocationToMesh();
      },
      (error) => {
        console.error('Location tracking error:', error);
      }
    );
  }

  private async sendLocationToMesh(): Promise<void> {
    if (!this.currentLocation) return;

    try {
      await this.bluetoothManager.sendLocationData(
        this.currentLocation.latitude,
        this.currentLocation.longitude
      );
    } catch (error) {
      console.error('Failed to send location to mesh:', error);
    }
  }

  private startMeshDataReception(): void {
    // This would be implemented to receive data from the mesh network
    // For now, we'll simulate receiving location data from other nodes
    
    setInterval(async () => {
      try {
        const locationData = await this.bluetoothManager.receiveLocationData();
        
        if (locationData && this.currentLocation) {
          this.updateNodeLocation('other-device', locationData);
        }
      } catch (error) {
        console.error('Failed to receive mesh data:', error);
      }
    }, 5000); // Check every 5 seconds
  }

  private updateNodeLocation(nodeId: string, location: {latitude: number, longitude: number}): void {
    if (!this.currentLocation) return;

    const distance = this.locationManager.calculateDistance(
      this.currentLocation.latitude,
      this.currentLocation.longitude,
      location.latitude,
      location.longitude
    );

    const bearing = this.locationManager.calculateBearing(
      this.currentLocation.latitude,
      this.currentLocation.longitude,
      location.latitude,
      location.longitude
    );

    const node: MeshtasticNode = {
      id: nodeId,
      name: `T-Beam ${nodeId}`,
      latitude: location.latitude,
      longitude: location.longitude,
      lastSeen: new Date(),
      distance,
      bearing,
    };

    this.nodes.set(nodeId, node);
    
    if (this.onNodeUpdate) {
      this.onNodeUpdate(Array.from(this.nodes.values()));
    }
  }

  setOnNodeUpdate(callback: (nodes: MeshtasticNode[]) => void): void {
    this.onNodeUpdate = callback;
  }

  getNodes(): MeshtasticNode[] {
    return Array.from(this.nodes.values());
  }

  getCurrentLocation(): LocationData | null {
    return this.currentLocation;
  }

  async disconnect(): Promise<void> {
    this.locationManager.stopWatching();
    await this.bluetoothManager.disconnect();
  }

  isConnected(): boolean {
    return this.bluetoothManager.isConnected();
  }

  // Simulate receiving location data from another T-Beam
  // This would be replaced with actual mesh network communication
  simulateOtherDeviceLocation(latitude: number, longitude: number): void {
    this.updateNodeLocation('simulated-device', { latitude, longitude });
  }
}
