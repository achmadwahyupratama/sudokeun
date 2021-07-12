import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Board from './src/components/Board';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './src/components/navigator/HomeStack';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <HomeStack/>
          <StatusBar style="auto" />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
