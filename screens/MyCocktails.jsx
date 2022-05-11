import Modal from '../components/Modal'
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMyCocktailsContext } from "../context/MyCocktailsContext";

const MyCocktails = ({navigation}) => {
  const { myCocktails } = useMyCocktailsContext();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("MyCocktailDetail", item);
      }}
    >
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text style={styles.itemList}>{item.strDrink}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View>
        <TouchableOpacity style={styles.addBtn} onPress={() => openModal()}>
          <Ionicons name="add-circle" size={30} color="green" />
          <Text>Add new cocktail</Text>
        </TouchableOpacity>
      </View>

    <Modal modalVisible={modalVisible} closeModal={closeModal}/>

    <FlatList
        data={myCocktails}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    marginTop: 10,
    width: '45%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
    list: {
      marginBottom: 115
    },
    image: {
      marginLeft: 5,
      width: 50,
      height: 50,
      borderRadius:150
    },
    container : {
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomColor: '#cfcfcf',
      borderBottomWidth: 1,
    },
    itemList: {
      fontSize: 15,
      marginTop: 20,
      marginLeft: 5,
    },
});


export default MyCocktails