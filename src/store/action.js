import { SET_INITBOARD, SET_ELEMENT, SET_VALIDATED, SET_LEVEL, SET_USER, SET_SOLVED, RESET_VALIDATED } from "./action-type";
import encodeParams from "./helper/encode";

export function setLevel(level) {
  return ((dispatch, getState) => {
    dispatch({
      type: SET_LEVEL,
      payload: level
    })
  })
}

export function setUser(username) {
  return ((dispatch, getState) => {
    dispatch({
      type: SET_USER,
      payload: username
    })
  })
}

export function fetchBoard() {
  return ((dispatch, getState) => {
    const level = getState().level
    fetch("https://sugoku.herokuapp.com/board?difficulty=" + level)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: SET_INITBOARD,
          payload: response.board
        })
      })
      .catch(err => {
        console.log(err);
      })
  })
}

export function resetBoard(){
  return ((dispatch, getState) => {
    dispatch({
      type: SET_INITBOARD,
      payload: []
    })
  })
}

export function setElement (newElement) {
  return ((dispatch, getState) => {
    const initValues = getState().editedBoard
    // const valuesToEdit = [...initValues]
    let editedValues = JSON.parse(JSON.stringify(initValues))
    console.log(editedValues);
    editedValues[newElement.row][newElement.col] = newElement.val
    console.log(editedValues);
    dispatch({
      type: SET_ELEMENT,
      payload: editedValues
    })
  })
}


export function submitAnswer () {
  return ((dispatch, getState) => {
    const data = {
      board: getState().initialBoard
    }
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        const solution = response.solution
        dispatch({
          type: SET_SOLVED,
          payload: {
            board: solution,
            status: 'solved'
          }
        })
      })
      .catch(console.warn)
  })
}


export function validateAnswer () {
  return ((dispatch, getState) => {
    const data = {
      board: getState().editedBoard
    }
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.status);
        dispatch({
          type: SET_VALIDATED,
          payload: response.status
        })
      })
      .catch(console.warn)
  })
}

export function resetValidate(){
  return ((dispatch, getState) => {
    dispatch({
      type: RESET_VALIDATED,
      payload: 'unsolved'
    })
  })
}