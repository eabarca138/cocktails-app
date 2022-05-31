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
    <View style={{ overflow: 'hidden', paddingBottom: 5, backgroundColor:'#354b63', height:'100%' }}>
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: cocktail.strDrinkThumb }} />
      </View>

    <View style={styles.listContainer}>

      <View>
      {ingredients.map((ingredient, i) => {
        return (
          <View key={i} style={styles.ul}>
            <Text>&diams;</Text>
            <Text style={styles.ing}>{ingredient}</Text>
          </View>
        );
      })}
      </View>

      <View>
      {measures.map((measure, i) => {
        return (
          <View key={i} style={styles.ul}>
            <Text style={styles.ing}>{measure}</Text>
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
  imageContainer: {
    paddingBottom:10,
    backgroundColor:'transparent',
    backgroundColor: '#223040',
    shadowColor: '#000',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    shadowOpacity:  0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  listContainer: {
    marginTop: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
    marginRight:10,
  },
  ul: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  ing: {
    color: 'white'
  },
  instructions: {
    marginTop: 10,
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 10,
    marginRight:10,
    textAlign: 'justify',
    color:'white'
  }
});
  

export default DetailData