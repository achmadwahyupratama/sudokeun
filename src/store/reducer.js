import { SET_ELEMENT, SET_INITBOARD, SET_VALIDATED, RESET_VALIDATED, SET_USER, SET_LEVEL, SET_SOLVED } from "./action-type";

const initialState = {
  initialBoard: [],
  editedBoard: [],
  validated: '',
  user: '',
  level: 'random'
}

export default function reducer(state = initialState, action){
  switch (action.type) {
    case SET_INITBOARD:
      return {...state, initialBoard: action.payload, editedBoard: action.payload}
    case SET_ELEMENT:
      return {...state, editedBoard: action.payload}
    case SET_VALIDATED:
      return {...state, validated: action.payload}
    case RESET_VALIDATED:
      return {...state, validated: action.payload}
    case SET_USER:
      return {...state, user: action.payload}
    case SET_LEVEL:
      return {...state, level: action.payload}
    case SET_SOLVED:
      return {...state, initialBoard: action.payload.board, editedBoard: action.payload.board, validated: action.payload.status}
    default:
      return state
  }
}