import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store';
import Home from './src/Home';
import Chats from './src/Chats';
import Chat from './src/Chat';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{title: 'WELCOME'}} />
          <Stack.Screen name="Chats" component={Chats} options={{title: 'CHANNELS'}} />
          <Stack.Screen name="Chat" component={Chat} options={{title: 'CHATH'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
