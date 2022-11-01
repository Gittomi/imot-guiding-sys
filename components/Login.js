import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import Constants from 'expo-constants'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

export default function Login({setLogin, navigation}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    

    useLayoutEffect(()=>{
        navigation.setOptions({headerShown: false});
    },[navigation])

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, userName,password)
        .then((userCredential) => {
            console.log(userCredential.user)
            setLogin(true)
            setUser(userCredential.user.email)
            navigation.setOptions({headerShown: true})
        }).catch ((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert("Invalid credentials!")
            }else if (error.code === 'auth/too-many-requests') {
                alert("Too many attemps, your account will be locked temporarily")
            } else {
                console.log(error.code)
                console.log(error.message)
            }
            })
        }
    
  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.containerItem}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input}
      placeholder='Type email here'
      placeholderTextColor='#cfcfcf'
      value={userName}
      onChangeText={text => setUserName(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input}
      placeholder='Type password here'
      placeholderTextColor='#cfcfcf'
      value={password}
      onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
      <Button title='login' onPress={login}/>
      </View>
      </View>
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#212121', 
      justifyContent: 'center'
       
    },
    containerItem: {
        marginLeft: 30,
        marginRight: 30,
        
    },
    heading: {
        fontSize: 48,
        fontWeight:'bold',
        padding: 10,
        color: '#ffffff',
        textAlign: 'center'
    },
    label:{
        fontWeight:'bold',
        color: '#f5f5f5',
        fontSize: 18,  
    },
    input: {
        padding: 10,
        color: '#cfcfcf',
        borderColor: '#cfcfcf',
        borderWidth: 1.5,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 10,
        height:40,
          
    },
    buttonContainer: {
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#24a0ed",
        backgroundColor: "#24a0ed",
        overflow: "hidden",
        marginBottom: 40,
      },
})