import DetailData from '../components/DetailData'
import { View, Text, StyleSheet } from 'react-native';

const MyCocktailDetail = ({route}) => {
    const cocktail = route.params;
  return (
    <View>
    <Text style={styles.title}>{cocktail.strDrink}</Text>
    
    <DetailData cocktail={cocktail}/>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: '#223040',
      color:'#dce3de',
      width: '100%'
      
    }
  });

export default MyCocktailDetail