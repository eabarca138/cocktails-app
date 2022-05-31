import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {  useDispatch, useSelector } from "react-redux";
import * as favsAction from '../store/actions/favs.action';

const Favorites = ({navigation}) => {
  const dispatch = useDispatch();
  const favs = useSelector(state => state.favorites.favs)

  useEffect(() => {
    dispatch(favsAction.loadFavs())
}, [])
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.container}         onPress={() => {
      navigation.navigate("CocktailDetail", item.strDrink);
    }}>
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text style={styles.itemList}>{item.strDrink}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.bg}>
      <FlatList
        data={favs}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(item,i ) => i}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    backgroundColor:'#354b63',
  },
  bg: {
    height:'100%',
    marginBottom: 50,
    backgroundColor:'#354b63',
  },
  itemList: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 5,
    color:'#dce3de'
  },
  image: {
    marginLeft: 5,
    width: 50,
    height: 50,
    borderRadius:150
  },
  text: {
    marginTop: 20,
  },
});


export default Favorites