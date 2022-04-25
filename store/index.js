import { createStore, combineReducers } from "redux"

import FavsReducer from './reducers/favs.reducer'

const RootReducer = combineReducers({
    favorites: FavsReducer
})

export default createStore(RootReducer)