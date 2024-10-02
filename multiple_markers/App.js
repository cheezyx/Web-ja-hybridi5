import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export default function App() {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Retrieve user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Add marker on long press
  const handleLongPress = (event) => {
    const newMarker = event.nativeEvent.coordinate;
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          onLongPress={handleLongPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
            />
          ))}
        </MapView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
