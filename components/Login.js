import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Constants from 'expo-constants'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

export default function Login({setLogin}) {
    const [userName, setUserName] = useState('commander@foo.com');
    const [password, setPassword] = useState('foobar1');
    const [user, setUser] = useState('');

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, userName,password)
        .then((userCredential) => {
            console.log(userCredential.user)
            setLogin(true)
            setUser(userCredential.user.email)
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
      value={userName}
      onChangeText={text => setUserName(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input}
      placeholder='Type password here'
      value={password}
      onChangeText={text => setPassword(text)}
      />
      <Button title='login' onPress={login}/>
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
        fontSize: 24,
        fontWeight:'bold',
        padding: 10,
        color: '#ffffff',
        
    },
    label:{
        padding: 10,
        fontWeight:'bold',
        color: '#f5f5f5',
        
    },
    input: {
        
        color: '#cfcfcf',
        borderBottomColor: '#cfcfcf',
        borderBottomWidth: 1,
        marginBottom: 20,
        
    }
})