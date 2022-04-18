import { StyleSheet, Text, Image, View } from 'react-native';
const CocktailDetail = ({route}) => {
    const cocktail = route.params;
  return (
    <View>
      <Text style={styles.text}>{cocktail.strDrink}</Text>
      <Image
        style={styles.image}
        source={{uri: cocktail.strDrinkThumb}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
      height: 200,
      width:200
    },
    text: {
        fontSize: 30
    }
  });
  

export default CocktailDetail