import HomeLocationScreen from './components/HomeLocationScreen';
import MarkMapScreen from './components/MarkMapScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadMarkedPointsScreen from './components/ReadMarkedPointsScreen';
import Login from './components/Login';
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';


export default function App() {
  
  const [logged, setLogged] = useState(false);
  const Stack = createNativeStackNavigator();

  //for android bottom navbar
  NavigationBar.setBackgroundColorAsync("#474747");
  NavigationBar.setButtonStyleAsync("light");
  
  if (!logged) {
    return (
      <Login setLogin={setLogged}/>
    )
  }
  else {
  return (
    
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        statusBarColor: '#474747',
      
      }}
      >
    <Stack.Screen
    name="HomeLocation"
    component={HomeLocationScreen}
    options={{
      title: 'HomeLocation',
      headerTitle: 'imoT Guiding System',
      headerStyle: {
        backgroundColor: '#474747',
      },
      headerTintColor: '#fff',
      
     
    }}
    />
    <Stack.Screen
    name="MarkMap"
    component={MarkMapScreen}
    options={{
      title: 'MarkMap',
      headerTitle: 'Give coordinates',
      headerStyle: {
        backgroundColor: '#474747',
      },
      headerTintColor: '#fff',
    }}
    />
    <Stack.Screen
    name="ReadMarkedPoints"
    component={ReadMarkedPointsScreen}
    options={{
      title: 'ReadMarkedPoints',
      headerTitle: 'Read given coordinates to fire',
      headerStyle: {
        backgroundColor: '#474747',
      },
      headerTintColor: '#fff',
    }}
    />
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}
}

