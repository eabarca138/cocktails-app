import { ADD_FAV } from "../actions/favs.action";
import { REMOVE_FAV } from "../actions/favs.action";
import { LOAD_FAVS } from "../actions/favs.action";

const initialState = {
    favs: [],
}
const FavsReducer = (state = initialState, action) => {
    const isFav = state.favs.find(fav => fav.idDrink == action.payload.idDrink)
    switch (action.type) {
        case ADD_FAV: {
            if (!isFav) {
                return { ...state,  favs: state.favs.concat(action.payload) }
            }
            return state
        }
        case LOAD_FAVS:
            return {
                ...state,
                favs: action.payload.map( item => {
                    obj = {}
                    obj.dbID = item.id,
                    obj.idDrink = item.idDrink,
                    obj.strDrink= item.strDrink,
                    obj.strDrinkThumb= item.strDrinkThumb
                    return obj
                })
            }
        case REMOVE_FAV: {
            if (isFav) {
                return { ...state,  favs: state.favs.filter(fav => fav.idDrink != action.payload.idDrink) }
            }
            return state
        }
        default: return state;
    }    
} 

export default FavsReducer;