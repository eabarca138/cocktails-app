import { useState, useEffect } from 'react';
import DetailData from '../components/DetailData'

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../store/actions/favs.action";

const CocktailDetail = ({route}) => {
    const strDrink = route.params;
    const cocktailName = strDrink.replace(/\s+/g, '_')

    const [cocktail, setCocktail] = useState([])
    const [loader, setLoader] = useState(false)

    const getData = async () => {
      try {
        setLoader(false)
        const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
        const data = await req.json();
        setCocktail(data.drinks[0]);
      } catch (e) {
        console.log(e);
      }
      finally {
        setLoader(true)
      }
    };
    useEffect(() => {
      getData();
    }, [cocktailName]);

    const dispatch = useDispatch();
    const handlerAddFav = (cocktail) => {
      dispatch(addFav(cocktail));
    };
    const handlerRemoveFav = (cocktail) => {
      dispatch(removeFav(cocktail)); 
    };

    const favs = useSelector(state => state.favorites.favs)
    const isFav = favs.find(fav => fav.idDrink == cocktail.idDrink)

  return (
    <View>
{ !loader ? <ActivityIndicator size="large" color="#dce3de" style={styles.loader}/> :
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
    <View>
    { isFav ?
      <TouchableOpacity onPress={() => handlerRemoveFav(cocktail)}><AntDesign name="star" size={30} color="yellow" /></TouchableOpacity>
      :
      <TouchableOpacity onPress={() => handlerAddFav(cocktail)}><AntDesign name="staro" size={30} color="#dce3de" /></TouchableOpacity>
    }
    </View>
    </View>

    <DetailData cocktail={cocktail}/>
    </View>
  }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 115,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: '#223040',
    paddingLeft: 10,
    paddingRight:10,
    paddingTop:10,
    
  },
  title: {
    color:'#dce3de',
    fontSize: 20,
    alignSelf: 'center'
  },
  loader: {
    width: '100%',
    height: '100%',
    backgroundColor:'#354b63'
  }
});


export default CocktailDetail