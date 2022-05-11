import { createContext, useContext } from "react";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyCocktailsContext = createContext();
export const useMyCocktailsContext = () => useContext(MyCocktailsContext);

const MyCocktailsContextProvider = ({ children }) => {
    const [myCocktails, setMyCocktails] = useState([]);
    
    const onAdd = (title, instructions, pickerURI) => {
        const id = uuidv4()
        const obj = {}
          obj.idDrink = id
          obj.strDrink = title;
          obj.strInstructions = instructions;
          obj.strDrinkThumb = pickerURI;
          setMyCocktails([...myCocktails, obj]);
        }

    
    
    return (
      <MyCocktailsContext.Provider value={{ onAdd, myCocktails }}>
        {children}
      </MyCocktailsContext.Provider>
    );
  };
  
  export default MyCocktailsContextProvider;