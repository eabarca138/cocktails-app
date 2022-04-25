import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

const Favorites = () => {
  const favs = useSelector(state => state.favorites.favs)

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text
        style={styles.itemList}
        onPress={() => {
          navigation.navigate("CocktailDetail", item.strDrink);
        }}
      >
        {item.strDrink}
      </Text>
    </View>
  );
  return (
    <View className="container">
      <FlatList
        data={favs}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width:100,
    borderRadius:150
  },
});


export default Favorites