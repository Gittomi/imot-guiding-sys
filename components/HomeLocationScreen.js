import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location'


export default function HomeLocationScreen({navigation}) {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async() => {
     let { status } = await Location.requestForegroundPermissionsAsync()
     if (status !== 'granted') {
       alert('Location failed!')
       return
     }
     const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
     console.log(location.coords)
     setLatitude(location.coords.latitude)
     setLongitude(location.coords.longitude)
     setAltitude(location.coords.altitude)
     setIsLoading(false)
    })()
   }, [])
   const handleClick = () => {
    setIsActive(current => !current);
   }
   const handleClickSecondButton = () => {
    setIsActive2(current => !current);
   }
   if (isLoading) {
    return  <View style={styles.container}><ActivityIndicator size='large' animating={true}/></View>
  }
  else {
  return (
    <View style={styles.container}>
    <Pressable
    onPressIn={handleClick} 
    onPress={() => navigation.navigate('MarkMap', {latitude: latitude, longitude:longitude, altitude: altitude})}
    onPressOut={handleClick}
    >
      <View style={[styles.buttonContainer, isActive ? styles.isActiveButton : styles.buttonContainer]}>
        <Text style={styles.buttonLabel}>Call Air Strike
        </Text>
      </View>
      </Pressable>
      <Pressable 
      onPressIn={handleClickSecondButton}
      onPress={() => navigation.navigate('ReadMarkedPoints')}
      onPressOut={handleClickSecondButton}
      >
        <View style={[styles.buttonContainer, isActive2 ? styles.isActiveButton : styles.buttonContainer]}>
          <Text style={styles.buttonLabel}>Read coordinates
          </Text>
        </View>
      </Pressable>
    </View>
  )
}
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#212121',
      padding: 20,
      justifyContent: 'center'
  },
  buttonContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#0066ff",
    marginBottom: 30,
    alignItems: 'center'
    
  },
  isActiveButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#3385ff",
    marginBottom: 30,
    alignItems: 'center'
  },
  buttonLabel: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 24,
  }
  
})