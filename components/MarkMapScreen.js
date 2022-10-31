import { View, Text, Dimensions, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, {useEffect, useState} from 'react'
import MapView,{ Marker } from 'react-native-maps'
import { addDoc, collection, firestore, COORDINATES, serverTimestamp } from '../firebase/Config';

export default function MarkMapScreen({route}) {
  
  const [markers,setMarkers] = useState([]);
  const showAlert = (value) => {
    Alert.alert("Warning!","Are You sure you want to call an air strike?",
    [
      {
        text: "Ok",
        onPress: () => saveData(value)
      },
      {
        text: "Cancel",
        onPress: () => ToastAndroid.show('Air Strike Cancelled!', ToastAndroid.SHORT)
      }
    ]
    );
  }
 
  const saveData = async(value) => {
      const positionObject = await addDoc(collection(firestore, COORDINATES), {
      latitude: value.lat,
      longitude: value.lng,
      altitude: route.params?.altitude,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    
    
    ToastAndroid.show('Air Strike Called! Get out!', ToastAndroid.SHORT);
  }
  

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      mapType='hybrid'
      initialRegion={{
        latitude: route.params?.latitude,
        longitude:route.params?.longitude,
        altitude: route.params?.altitude,
        latitudeDelta:0.000922,
        longitudeDelta:0.00321,
      }}
      onLongPress={(e) => {
        
        const newMarker = {"lat" : e.nativeEvent.coordinate.latitude,"lng":e.nativeEvent.coordinate.longitude}
        const updatedMarkers = [...markers,newMarker]
        setMarkers(updatedMarkers)
        showAlert(newMarker)
      }}>
        {markers.map((marker,index)=> (
          <Marker 
            key={index}
            coordinate={{latitude: marker.lat,longitude: marker.lng}}
          />
        ))}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent:'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
})