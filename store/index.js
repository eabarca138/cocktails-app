import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import FavsReducer from './reducers/favs.reducer'

const RootReducer = combineReducers({
    favorites: FavsReducer
})

export default createStore(RootReducer, applyMiddleware(thunk))