import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import { Provider } from 'react-redux';
import { myStore } from './src/redux/MyStore';
import MyCart from './src/MyCart';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="CartScreen" component={MyCart} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App