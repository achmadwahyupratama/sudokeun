import React, { useState } from 'react'
import { View, Text, TextInput, Image, Dimensions, Button/* , KeyboardAvoidingView  */} from 'react-native'
import { useDispatch } from 'react-redux'
import { setLevel, setUser } from '../store/action'

export default function Home({navigation}) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [difficulty, setDifficulty] = useState('random')
  const vw = Dimensions.get('window').width
  const vh = Dimensions.get('window').height
  function beginGame(event) {
    event.preventDefault()
    dispatch( setLevel(difficulty) )
    dispatch( setUser(username) )
    navigation.navigate('Game')
  }
  return (
    // <KeyboardAvoidingView>
    <View style={{flex: 1, justifyContent:'center', margin: 20}} >
      <Image
          source={{
            uri: 'https://www.pikpng.com/pngl/m/443-4439282_sudoku-puzzle-math-riddle-svg-png-icon-free.png',
          }}
          style={{ width: 0.4 * vw , height: 0.4 * vw, alignSelf:'center' }}
        />
      <View>
        <Text style={{textAlign: 'center', margin: 0.03*vh}} >SUDOKEUN</Text>
        <TextInput
          style={{
            height: 40,
            margin: 0.03*vh,
            textAlign: 'center',
            backgroundColor: '#BBBB'
          }}
          onChangeText={text => setUsername(text)}
          placeholder="ENTER YOUR NAME"
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button title="easy" onPress={()=>{ setDifficulty('easy') }}/>
        <Button title="medium" onPress={()=>{ setDifficulty('medium') }}/>
        <Button title="hard" onPress={()=>{setDifficulty('hard')}}/>
      </View>
      <View style={{alignItems: 'center', margin: 0.06*vh}}>
        <Text> Username: {username} </Text>
        <Text>Difficulty: {difficulty.toUpperCase()}</Text>
        <View style={{margin: 0.03*vh}}>
          <Button title="Start" onPress={(e) => {
            beginGame(e)}}/>
        </View>
      </View>
    </View>
    // </KeyboardAvoidingView>
  )
}
