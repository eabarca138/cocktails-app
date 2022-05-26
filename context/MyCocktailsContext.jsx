import { createContext, useContext } from "react";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyCocktailsContext = createContext();
export const useMyCocktailsContext = () => useContext(MyCocktailsContext);

const MyCocktailsContextProvider = ({ children }) => {
    const [myCocktails, setMyCocktails] = useState([]);
    
    const onAdd = (title, instructions, pickerURI, ingredients) => {
        const id = uuidv4()
        const obj = {}
          obj.idDrink = id
          obj.strDrink = title;
          obj.strInstructions = instructions;
          obj.strDrinkThumb = pickerURI;
          ingredients.forEach((ingredient, i) => {
          obj[`strIngredient${i+1}`] = ingredient.strIngredient
          obj[`strMeasure${i+1}`] = ingredient.strMeasure
          });
          setMyCocktails([...myCocktails, obj]);
        }

        const removeCocktail = (idDrink) => {
          setMyCocktails(myCocktails.filter(cocktail => cocktail.idDrink !== idDrink))
        }

    return (
      <MyCocktailsContext.Provider value={{ myCocktails, onAdd, removeCocktail }}>
        {children}
      </MyCocktailsContext.Provider>
    );
  };
  
  export default MyCocktailsContextProvider;