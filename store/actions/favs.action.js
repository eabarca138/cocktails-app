import { insertFav, fetchFavs, deleteFav } from '../../db';

// types
export const ADD_FAV = 'ADD_FAV'
export const LOAD_FAVS = 'LOAD_FAVS';
export const REMOVE_FAV = 'REMOVE_FAV'

// actions

export const addFav = cocktail => {
  return async (dispatch) => {
    try {
        const result = await insertFav(cocktail.strDrink, cocktail.strDrinkThumb, cocktail.idDrink);
        cocktail.id = result.insertId

      dispatch({ type: ADD_FAV, payload: cocktail });
    } catch (err) {
      throw err;
    }
  };
};

export const loadFavs = () => {
  return async (dispatch) => {
    try {
      const result = await fetchFavs();
      dispatch({ type: LOAD_FAVS, payload: result.rows._array });
    } catch (err) {
      throw err;
    }
  };
};


export const removeFav = cocktail => {
        return async dispatch => {
            try {
                const result = await deleteFav(cocktail.idDrink);
                dispatch({type: REMOVE_FAV, payload: cocktail});
            } catch(err) {
                throw err;
            }
        }
    } 