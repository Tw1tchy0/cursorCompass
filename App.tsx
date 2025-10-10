import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import Compass from './src/components/Compass';
import MeshtasticService, { MeshtasticNode } from './src/services/MeshtasticService';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [heading, setHeading] = useState(0);
  const [nodes, setNodes] = useState<MeshtasticNode[]>([]);
  const [meshtasticService, setMeshtasticService] = useState<MeshtasticService | null>(null);

  useEffect(() => {
    requestPermissions();
    initializeSensors();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        
        const allGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        
        if (!allGranted) {
          Alert.alert('Permissions Required', 'Please grant all permissions to use the app');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const initializeSensors = () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      // Calculate heading from accelerometer data
      const heading = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(heading < 0 ? heading + 360 : heading);
    });

    return () => subscription.unsubscribe();
  };

  const connectToTBeam = async () => {
    try {
      const service = new MeshtasticService();
      await service.initialize();
      
      service.setOnNodeUpdate((updatedNodes) => {
        setNodes(updatedNodes);
      });
      
      setMeshtasticService(service);
      setIsConnected(true);
      
      // Simulate receiving data from another T-Beam for testing
      setTimeout(() => {
        service.simulateOtherDeviceLocation(
          (Math.random() - 0.5) * 0.01 + 40.7128, // Simulate NYC area
          (Math.random() - 0.5) * 0.01 - 74.0060
        );
      }, 2000);
      
    } catch (error) {
      console.error('Failed to connect to T-Beam:', error);
      Alert.alert('Connection Error', 'Failed to connect to T-Beam device');
    }
  };

  const disconnect = async () => {
    if (meshtasticService) {
      await meshtasticService.disconnect();
      setMeshtasticService(null);
      setIsConnected(false);
      setNodes([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Meshtastic Compass</Text>
        <Text style={styles.status}>
          {isConnected ? 'Connected to T-Beam' : 'Not Connected'}
        </Text>
      </View>

      <View style={styles.compassContainer}>
        {nodes.length > 0 ? (
          <Compass 
            heading={heading}
            bearing={nodes[0].bearing}
            distance={nodes[0].distance}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              {isConnected ? 'Waiting for other T-Beam...' : 'Connect to T-Beam to start'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        {nodes.length > 0 && (
          <>
            <Text style={styles.infoText}>
              Distance: {nodes[0].distance > 1000 
                ? `${(nodes[0].distance / 1000).toFixed(1)} km` 
                : `${nodes[0].distance.toFixed(0)} m`}
            </Text>
            <Text style={styles.infoText}>
              Bearing: {nodes[0].bearing.toFixed(0)}°
            </Text>
          </>
        )}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={isConnected ? disconnect : connectToTBeam}
        >
          <Text style={styles.buttonText}>
            {isConnected ? 'Disconnect' : 'Connect to T-Beam'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
