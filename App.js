import HomeLocationScreen from './components/HomeLocationScreen';
import MarkMapScreen from './components/MarkMapScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadMarkedPointsScreen from './components/ReadMarkedPointsScreen';
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { LogBox } from 'react-native';


export default function App() {
  
  
  const Stack = createNativeStackNavigator();

  //for android bottom navbar
  NavigationBar.setBackgroundColorAsync("#474747");
  NavigationBar.setButtonStyleAsync("light");

  
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    
    <NavigationContainer>
      <StatusBar style="light" animated={true} />

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
      headerShown: false,
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
      headerTitle: 'Air Strike Coordinates',
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


