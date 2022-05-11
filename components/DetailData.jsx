import { StyleSheet, Text, Image, View } from 'react-native';

const DetailData = ({ cocktail }) => {
  const ingredients = []
  const measures = []

  for(let key in cocktail) {
    if (key.includes('strIngredient') && (cocktail[key] !== null) && cocktail[key] !== "") {
      ingredients.push(cocktail[key]);
    }
}
  for(let key in cocktail) {
    if (key.includes('strMeasure') &&cocktail[key] !== null && cocktail[key] !== "") {
      measures.push(cocktail[key]);
    }
}
  return (
    <View>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />

    <View style={styles.listContainer}>

      <View>
      {ingredients.map((ingredient, i) => {
        return (
          <View key={i} style={styles.ul}>
            <Text>&diams;</Text>
            <Text>{ingredient}</Text>
          </View>
        );
      })}
      </View>

      <View>
      {measures.map((measure, i) => {
        return (
          <View key={i} style={styles.ul}>
            <Text>{measure}</Text>
          </View>
        );
      })}
      </View>
    </View>

    <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    height: 150,
    width: 150,
    borderRadius: 150,
    alignSelf: 'center'
  },
  listContainer: {
    marginTop: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },
  ul: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  instructions: {
    marginTop: 10,
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'justify'
  }
});
  

export default DetailData