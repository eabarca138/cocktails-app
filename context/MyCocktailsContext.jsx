import { createContext, useContext } from "react";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyCocktailsContext = createContext();
export const useMyCocktailsContext = () => useContext(MyCocktailsContext);

const MyCocktailsContextProvider = ({ children }) => {
    const [myCocktails, setMyCocktails] = useState([]);
    
    const onAdd = (title, instructions, pickerURI, ingredients, measures) => {
        const id = uuidv4()
        const obj = {}
          obj.idDrink = id
          obj.strDrink = title;
          obj.strInstructions = instructions;
          obj.strDrinkThumb = pickerURI;
          obj.ingredients = ingredients;
          obj.measures = measures;
          setMyCocktails([...myCocktails, obj]);
        }

    console.log(myCocktails);
    
    return (
      <MyCocktailsContext.Provider value={{ onAdd, myCocktails }}>
        {children}
      </MyCocktailsContext.Provider>
    );
  };
  
  export default MyCocktailsContextProvider;