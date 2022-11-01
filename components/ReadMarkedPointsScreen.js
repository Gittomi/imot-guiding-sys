import { View, Text, StyleSheet, ScrollView, Pressable, Alert, ToastAndroid, NativeEventEmitter } from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import { query, orderBy, onSnapshot, firestore, collection, COORDINATES, deleteDoc, doc } from '../firebase/Config';
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from '../helpers/Functions';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'; 
import {getAuth} from '../firebase/Config';


export default function ReadMarkedPointsScreen({navigation}) {
    const [spots, setSpots] = useState([]);
    const [myStyle, setMyStyle] = useState(false);
    
    useEffect(() => {
        const q = query(collection(firestore,COORDINATES), orderBy('created', 'desc'))
      
        const unsubscribe = onSnapshot(q,(querySnapshot) => {
          const tempCoordinates = []
      
          querySnapshot.forEach((doc) => {
            const coordinateObject = {
              id: doc.id,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              altitude: doc.data().altitude,
              created: convertFirebaseTimeStampToJS(doc.data().created)
            }
            tempCoordinates.push(coordinateObject)
          })
          setSpots(tempCoordinates)
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
                                .then(() => navigation.push('HomeLocation',{setLogin: false}),
                                        ToastAndroid.show('User logged out.', ToastAndroid.SHORT)
                                )}
                />
            ),
        })
      }, [])
      
      const deleteDocument = async(itemId) => {
        try {
          const delDoc  =  doc(firestore, COORDINATES, itemId);
          await deleteDoc(delDoc);
          ToastAndroid.show('Coordinates deleted.', ToastAndroid.SHORT);
        } catch(error){
          alert(error)
        }
      }
      const showAlert = (itemId) => {
        Alert.alert("Warning!","You are deleting air strike coordinates. Are you sure?",
        [
          {
            text: "Ok",
            onPress: () => deleteDocument(itemId)  
          },
          {
            text: "Cancel",
            onPress: () => ToastAndroid.show('User cancelled. Nothing done.', ToastAndroid.SHORT)
          }
        ]
        );
      }
      const handleClick = (itemId) => {
        setMyStyle(prevState => ({
          ...myStyle,
          [itemId]: !prevState[itemId]
        }));
      }
      return (
        <View style={styles.spotContainer}>
          <ScrollView>
          {
            spots.map((spot) => (
              <View style={styles.container} key={spot.id}>
                <View style={styles.spot}>
                <Text style={styles.spotInfo}>{spot.created}</Text>
                <Text>lat:{spot.latitude.toFixed(8)}</Text>
                <Text>lng:{spot.longitude.toFixed(8)}</Text>
                <Text>alt:{spot.altitude.toFixed(8)}</Text>
                
                </View>
                 <Pressable style={[styles.buttonDeleteContainer, myStyle[`${spot.id}`] ? styles.isActiveButton : styles.buttonDeleteContainer]} 
                 
                 onPressIn={() => handleClick(spot.id)}
                 onPress={ () => showAlert(spot.id)}
                 onPressOut={() => handleClick(spot.id)}
                 >
                    <EvilIcons name="trash" size={48} color="grey" />
                  </Pressable>
              </View>
            
            ))
          }
          </ScrollView>
        </View>
      );
}
const styles = StyleSheet.create({
    spotContainer: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#212121',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#cccccc',
      borderRadius: 5,
      marginLeft: 15,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'space-between',

    },
   
    spot: {
      paddingRight: 30,
    },
    spotInfo: {
      fontSize: 12,
    },
    buttonDeleteContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 40,
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 0.5,
      width: 50,
      height: 50,
      
    },
   isActiveButton: {
      alignItems: 'center',
      backgroundColor: '#a6a6a6',
      borderRadius: 40,
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 0.5,
      width: 50,
      height: 50,
      
    },
    
  });