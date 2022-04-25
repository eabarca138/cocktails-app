// types
export const ADD_FAV = 'ADD_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'

// actions
export const addFav = cocktail => ({
        type: ADD_FAV,
        payload: cocktail
    
})
export const removeFav = cocktail => ({
        type: REMOVE_FAV,
        payload: cocktail
})