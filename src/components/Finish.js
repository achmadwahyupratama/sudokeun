import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector} from 'react-redux'
import { fetchBoard, resetBoard, resetValidate, setLevel, setUser } from '../store/action'
import { useStopwatch } from 'react-timer-hook'

export default function Finish({navigation, route}) {
  const username = useSelector(state => state.user)
  const {hours, minutes, seconds} = route.params
  const {start, pause, reset } = useStopwatch({ autoStart: false })
  const dispatch = useDispatch()
  function playAgain(e){
    e.preventDefault()
    dispatch( fetchBoard() )
    dispatch( resetValidate() )
    navigation.navigate('Game')
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center', margin: 10}}>WOHOOO ! {username}, you've finished with time {hours} hours, {minutes} minutes, {seconds} seconds. SUDOKEUN !</Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems:'center', width: 200, maxHeight: 40}}>
        <Button title="Play Again" onPress={(e)=> playAgain(e)}/>
        <Button title="Home" onPress={(e)=> {
          dispatch( resetBoard() )
          dispatch( setUser('') )
          dispatch( setLevel('random') )
          navigation.navigate('Home')
          }}/>
      </View>
    </View>
  )
}
