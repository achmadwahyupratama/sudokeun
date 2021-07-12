import ReduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'

const middleware = applyMiddleware(ReduxThunk)
const store = createStore(reducer, middleware)
export default store