import { StyleSheet } from 'react-native'
import React from 'react'
import Home from './Home';
import VideoPlayer from './VideoPlayer';
import AdminLogin from './AdminLogin';
import DrawResult from './DrawResult';
import AdminPannel from './AdminPannel';

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

export type RootStackParamList = {
  Home: undefined;
  VideoPlayer: undefined;
  AdminLogin: undefined;
  DrawResult: undefined;
  AdminPannel:undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        {/* Screens */}
        <Stack.Screen
          name='VideoPlayer'
          component={VideoPlayer}
          options={{ headerShown: false }} />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }} />

        <Stack.Screen
          name='AdminLogin'
          component={AdminLogin}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='DrawResult'
          component={DrawResult}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='AdminPannel'
          component={AdminPannel}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  topBar: {
    height: 70,
    width: '100%',
    paddingLeft: 12,
  },
})
export default App