import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

const CocktailList = ({ route, navigation }) => {
  const strLiquor = route.params;
  const liquor = strLiquor.replace(/\s+/g, "_");
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    try {
      setLoader(false);
      const req = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquor}`
      );
      const data = await req.json();
      setList(data.drinks);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("CocktailDetail", item.strDrink);
      }}
    >
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text style={styles.itemList}>{item.strDrink}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      {!loader ? (
        <ActivityIndicator size="large" color="#dce3de" style={styles.loader} />
      ) : (
        <View style={styles.bg}>
          <FlatList
            style={styles.list}
            data={list}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
    backgroundColor:'#354b63',
  },
  bg: {
    height:'100%',
    backgroundColor: '#354b63'
  },
  list: {
    marginBottom: 50
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
  loader: {
    width: '100%',
    height: '100%',
    backgroundColor:'#354b63'
  }
});

export default CocktailList