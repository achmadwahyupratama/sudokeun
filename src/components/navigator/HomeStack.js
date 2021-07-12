import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Home'
import Board from '../Board'
import Finish from '../Finish'

export default function HomeStack() {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Board} />
      <Stack.Screen name="Finish" component={Finish} />
    </Stack.Navigator>
  )
}
