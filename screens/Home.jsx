import { View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const Categories = ({navigation}) => {

  const liquors = [
    "Gin",
    "Rum",
    "Light rum",
    "Dark rum",
    "Tequila",
    "Vodka",
    "Whiskey",
    "Irish whiskey",
    "Scotch",
    "Blended whiskey",
    "Pisco",
    "Dry Vermouth",
    "Aperol",
  ];

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      navigation.navigate("CocktailList", item);
    }}
  >
    <Text style={styles.text}>{item}</Text>
    <SimpleLineIcons name="arrow-right" size={15} color="gray" />
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
    <FlatList
      style={styles.list}
      data={liquors}
      renderItem={renderItem}
      keyExtractor={item => item}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#354b63'
  },
  list: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 115
  },
  item: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color:"#dce3de"
  }
});

export default Categories