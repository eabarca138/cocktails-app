import {listData} from '../service/listData'
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

const CocktailList = ({navigation}) => {
    const [list, setList] = useState(listData)
  return <View>
      {list.map((cocktail, i) => {
          return (
            <Text style={styles.itemList} key={i} onPress={ () => {navigation.navigate('CocktailDetail', cocktail)}}>{cocktail.strDrink}</Text>
          )
      })}
      </View>
}

const styles = StyleSheet.create({
    itemList: {
        fontSize: 15,
        marginTop:20,
        marginLeft:5
    }
  });

export default CocktailList