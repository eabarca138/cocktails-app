import { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Button } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../store/actions/favs.action";

const CocktailDetail = ({route}) => {
    const strDrink = route.params;
    const cocktailName = strDrink.replace(/\s+/g, '_')

    const [cocktail, setCocktail] = useState([])
    const [loader, setLoader] = useState(false)

    const getData = async () => {
      try {
        const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
        const data = await req.json();
        setCocktail(data.drinks[0]);
        setLoader(true)
      } catch (e) {
        console.log(e);
      }
    };
    useEffect(() => {
      getData();
    }, []);

    const dispatch = useDispatch();
    const handlerAddFav = (cocktail) => {
      dispatch(addFav(cocktail));
    };
    const handlerRemoveFav = (cocktail) => {
      dispatch(removeFav(cocktail));
    };

    const favs = useSelector(state => state.favorites.favs)
    const isFav = favs.find(fav => fav.idDrink === cocktail.idDrink)

  return (
    <View>
      <Text style={styles.text}>{cocktail.strDrink}</Text>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
{ loader &&
    <View>
    { isFav ?
      <Button
      onPress={() => handlerRemoveFav(cocktail)}
      style={styles.button}
      title="REMOVE FAVS"
      color="#FF0000"
      accessibilityLabel="REMOVE FAVS"
      />
      :
      <Button
        onPress={() => handlerAddFav(cocktail)}
        style={styles.button}
        title="ADD FAVS"
        color="#00FF00"
        accessibilityLabel="ADD FAVS"
      />
    }
    </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
      height: 200,
      width:200,
      borderRadius:150
    },
    text: {
        fontSize: 30
    }
  });
  

export default CocktailDetail