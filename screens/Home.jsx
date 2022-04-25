import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try{
    const req = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
    const data = await req.json()
    setCategories(data.drinks)
  }
  catch(e){
    console.log(e)
  }
}
useEffect(() => {
  getData()
}, [])

const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate("CocktailList", item.strCategory);
          }}>
    <Text>{item.strCategory}</Text>
    <SimpleLineIcons name="arrow-right" size={15} color="gray" />
    </TouchableOpacity>
);

  return (
    <FlatList
      style={styles.list}
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.strCategory}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginRight: 20,
    marginLeft: 20,
  },
  item: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Categories