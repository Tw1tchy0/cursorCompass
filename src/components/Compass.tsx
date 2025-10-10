import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

interface CompassProps {
  heading: number;
  bearing: number;
  distance: number;
}

const Compass: React.FC<CompassProps> = ({ heading, bearing, distance }) => {
  const size = 300;
  const center = size / 2;
  const radius = center - 20;

  // Calculate the relative bearing (bearing - heading)
  const relativeBearing = (bearing - heading + 360) % 360;
  
  // Convert to radians
  const angleRad = (relativeBearing * Math.PI) / 180;
  
  // Calculate dot position
  const dotX = center + Math.sin(angleRad) * (radius - 30);
  const dotY = center - Math.cos(angleRad) * (radius - 30);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.compass}>
        {/* Outer circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Inner circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius - 20}
          stroke="#666"
          strokeWidth="1"
          fill="none"
        />
        
        {/* North indicator */}
        <Line
          x1={center}
          y1={center - radius + 10}
          x2={center}
          y2={center - radius + 30}
          stroke="#FF0000"
          strokeWidth="3"
        />
        <SvgText
          x={center}
          y={center - radius + 45}
          fontSize="16"
          fill="#FF0000"
          textAnchor="middle"
        >
          N
        </SvgText>
        
        {/* East indicator */}
        <Line
          x1={center + radius - 10}
          y1={center}
          x2={center + radius - 30}
          y2={center}
          stroke="#333"
          strokeWidth="2"
        />
        <SvgText
          x={center + radius - 15}
          y={center + 5}
          fontSize="14"
          fill="#333"
          textAnchor="middle"
        >
          E
        </SvgText>
        
        {/* South indicator */}
        <Line
          x1={center}
          y1={center + radius - 10}
          x2={center}
          y2={center + radius - 30}
          stroke="#333"
          strokeWidth="2"
        />
        <SvgText
          x={center}
          y={center + radius - 15}
          fontSize="14"
          fill="#333"
          textAnchor="middle"
        >
          S
        </SvgText>
        
        {/* West indicator */}
        <Line
          x1={center - radius + 10}
          y1={center}
          x2={center - radius + 30}
          y2={center}
          stroke="#333"
          strokeWidth="2"
        />
        <SvgText
          x={center - radius + 15}
          y={center + 5}
          fontSize="14"
          fill="#333"
          textAnchor="middle"
        >
          W
        </SvgText>
        
        {/* Direction lines every 30 degrees */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const innerRadius = radius - 15;
          const outerRadius = radius - 5;
          
          return (
            <Line
              key={i}
              x1={center + Math.sin(angle) * innerRadius}
              y1={center - Math.cos(angle) * innerRadius}
              x2={center + Math.sin(angle) * outerRadius}
              y2={center - Math.cos(angle) * outerRadius}
              stroke="#999"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Target dot */}
        <Circle
          cx={dotX}
          cy={dotY}
          r="8"
          fill="#FF6B6B"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        
        {/* Direction line to target */}
        <Line
          x1={center}
          y1={center}
          x2={dotX}
          y2={dotY}
          stroke="#FF6B6B"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Center dot */}
        <Circle
          cx={center}
          cy={center}
          r="4"
          fill="#333"
        />
      </Svg>
      
      {/* Distance and bearing info */}
      <View style={styles.infoOverlay}>
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <Text style={styles.infoLabelText}>Distance</Text>
          </View>
          <Text style={styles.infoValue}>
            {distance > 1000 ? `${(distance / 1000).toFixed(1)} km` : `${distance.toFixed(0)} m`}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoLabel}>
            <Text style={styles.infoLabelText}>Bearing</Text>
          </View>
          <Text style={styles.infoValue}>
            {bearing.toFixed(0)}°
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compass: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: -60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
  },
  infoLabel: {
    marginBottom: 2,
  },
  infoLabelText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Compass;
