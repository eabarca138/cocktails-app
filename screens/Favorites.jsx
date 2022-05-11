import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {  useSelector } from "react-redux";

const Favorites = ({navigation}) => {
  const favs = useSelector(state => state.favorites.favs)
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.container}         onPress={() => {
      navigation.navigate("CocktailDetail", item.strDrink);
    }}>
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text style={styles.itemList}>{item.strDrink}</Text>
    </TouchableOpacity>
  );
  return (
    <View className="container">
      <FlatList
        data={favs}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
  },
  list: {
    marginBottom: 115
  },
  itemList: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 5,
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