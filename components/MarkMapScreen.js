import { View, Dimensions, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import MapView,{ Marker } from 'react-native-maps'
import { addDoc, deleteDoc, doc, collection, firestore, COORDINATES, serverTimestamp, getAuth, query, onSnapshot, orderBy } from '../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function MarkMapScreen({navigation, route}) {
  
  const [markers,setMarkers] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore,COORDINATES), orderBy('created', 'desc'))
  
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempCoordinates = []
  
      querySnapshot.forEach((doc) => {
        const coordinateObject = {
          id: doc.id,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          altitude: doc.data().altitude
        }
        if(coordinateObject === null) {
          coordinateObject =[]
        }
        tempCoordinates.push(coordinateObject)
      })
      setMarkers(tempCoordinates)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  useLayoutEffect(() => {
    navigation.setOptions({
       headerRight: () => (
            <MaterialIcons
            name="logout"
            size={24}
            color="white"
            onPress={() => getAuth()
                           .signOut()
                            .then(() => route.params.setLogin(false),
                            navigation.navigate('HomeLocation'),
                            ToastAndroid.show('User logged out.', ToastAndroid.SHORT)
                            )}
            />
        ),
    })
  }, [navigation])
  const showAlert = (value) => {
    Alert.alert("Warning!","Are You sure you want to call an air strike?",
    [
      {
        text: "Ok",
        onPress: () => saveData(value)
      },
      {
        text: "Cancel",
        onPress: () => 
                      ToastAndroid.show('Air Strike Cancelled!', ToastAndroid.SHORT)
      }
    ]
    );
  }
  const showAlertDelete = (index, docId) => {
    Alert.alert("Warning!","Are You sure you want to delete marked coordinates?",
    [
      {
        text: "Ok",
        onPress: () => onMarkerPress(index, docId)
                        
      },
      {
        text: "Cancel",
        onPress: () =>  { ToastAndroid.show('Coordinates kept in database.', ToastAndroid.SHORT)}
      }
    ]
    );
  }
 
  const saveData = async(value) => {
      const positionObject = await addDoc(collection(firestore, COORDINATES), {
      latitude: value.latitude,
      longitude: value.longitude,
      altitude: route.params?.altitude,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    
      ToastAndroid.show('Air Strike Called! Get out!', ToastAndroid.SHORT);
  }
  const deleteDocument = async(docId) => {
    try {
      const delDoc  =  doc(firestore, COORDINATES, docId);
      await deleteDoc(delDoc);
      ToastAndroid.show('Coordinates deleted.', ToastAndroid.SHORT);
    } catch(error){
      console.log(error)
    }
  }
  
const onMarkerPress = (index, docId) => {
  const updatedMarkers = [...markers];
  updatedMarkers.splice(index, 1);
  setMarkers(updatedMarkers);
  deleteDocument(docId); 


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
        
        const newMarker = {"latitude" : e.nativeEvent.coordinate.latitude,"longitude":e.nativeEvent.coordinate.longitude}
        const updatedMarkers = [...markers,newMarker]
        setMarkers(updatedMarkers)
        showAlert(newMarker)
      }}>
        {markers.map((marker, index)=> (
          <Marker 
          onPress={() => showAlertDelete(index, marker.id)}
            key={index}
            coordinate={{latitude: marker.latitude,longitude: marker.longitude}}
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