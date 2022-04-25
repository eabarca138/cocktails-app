import { ADD_FAV } from "../actions/favs.action";
import { REMOVE_FAV } from "../actions/favs.action";

const initialState = {
    favs: [],
}

const FavsReducer = (state = initialState, action) => {
    const isFav = state.favs.find(fav => fav.idDrink === action.payload.idDrink)
    switch (action.type) {
        case ADD_FAV: {
            if (!isFav) {
                return { ...state,  favs: state.favs.concat(action.payload) }
            }
            return state
        }
        case REMOVE_FAV: {
            if (isFav) {
                return { ...state,  favs: state.favs.filter(fav => fav.idDrink !== action.payload.idDrink) }
            }
            return state
        }
        default: return state;
    }    
} 

export default FavsReducer;