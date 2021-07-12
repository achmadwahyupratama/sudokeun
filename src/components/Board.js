import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Dimensions, TouchableOpacity, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard, setElement, submitAnswer, validateAnswer } from '../store/action'
import { useStopwatch } from 'react-timer-hook'


export default function Board({navigation}) {
  const initialBoard = useSelector(state => state.initialBoard)
  const editBoard = useSelector(state => state.editedBoard)
  const validated = useSelector(state => state.validated)
  const dispatch = useDispatch()
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: true })

  useEffect(()=>{
    dispatch( fetchBoard() )
    dispatch( validateAnswer() )
    reset()
    start()
    // console.log(initialBoard);
  }, [])
  function changeHandler(payload){
    console.log(payload);
    dispatch(setElement(payload))
    dispatch( validateAnswer() )
    // setValues(payload)
  }
  function solveBoard(event){
    event.preventDefault()
    // console.log(editBoard, '<<<edited');
    dispatch(submitAnswer())
    pause()
    // dispatch( validateAnswer() )
  }
  function onSubmit(event) {
    event.preventDefault()
    if (validated === 'solved') {
      pause()
      navigation.navigate('Finish', {hours, minutes, seconds})
      reset()
    }
  }
  return (
    <>
    {/* <TouchableOpacity onPress={()=> Keyboard.dismiss()}> */}
      <View style={styles.containerOuter}>
        <Text>SUDOKEUN</Text>
        {
          !initialBoard.length ? <View style={styles.containerLoading}><Text style={{textAlign:'center'}}>Please Wait, generating board...</Text></View> : (
            <View style={styles.container}>
              {
                initialBoard.map((rowValue, idx) => {
                  return(<View key={String(idx)} style={styles.row_container}>
                    {
                      rowValue.map((value, idx2) => {
                        if (!value) {
                          return (
                            <View key={String(idx2)} style={styles.cell}>
                              <TextInput
                                style={{height: 20, color:'green', textAlign:'center'}}
                                placeholder=" "
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={text => changeHandler({row: idx, col: idx2, val:Number(text)})}
                                // defaultValue={'0'}
                              />
                            </View>
                            )
                        } else {
                          return (<View key={String(idx2)} style={styles.cell}><Text>{value}</Text></View>)
                        }
                      })
                    }
                  </View>)
                })
              }
            </View>
          )
        }
        {
          initialBoard.length ? <Text>{hours}:{minutes}:{seconds} </Text> : <Text></Text>
        }
        <View style={styles.button_group}>
          <Button title="SOLVE" onPress={(e)=>solveBoard(e)}/>
          {
            (validated === 'solved') ? <Button title="Submit" onPress={(e)=> onSubmit(e)}/> : <Button title="Submit" disabled/>
          }
        </View>
        {
          (validated === 'solved') ? <Text>SOLVED!</Text> : <Text/> 
        }
      </View>
    {/* </TouchableOpacity> */}
    </>
  )
}


const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    maxWidth: 200,
    padding: 2,
    // borderWidth: 1,
    // borderColor: 'green',
    margin: 10,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 200,
    maxWidth: 200,
    padding: 2,
    // borderWidth: 1,
    // borderColor: 'green',
    margin: 10,
  },
  row_container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
    marginBottom: 1,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    width: 20,
    height: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: 'white'
  },
  button_group:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginVertical: 1,
    width: 200,
    // borderWidth: 1,
    // borderColor: 'blue',
    maxHeight: 100
  }
});

