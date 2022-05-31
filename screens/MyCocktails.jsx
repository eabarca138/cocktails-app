import Modal from '../components/Modal'
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { useMyCocktailsContext } from "../context/MyCocktailsContext";

const MyCocktails = ({navigation}) => {
  const { myCocktails, removeCocktail } = useMyCocktailsContext();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.listContent}
        onPress={() => {
          navigation.navigate("MyCocktailDetail", item);
        }}
      >
        <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
        <Text style={styles.name}>{item.strDrink}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={()=>{removeCocktail(item.idDrink)}}>
      <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.bg}>
      <View>
        <TouchableOpacity style={styles.addBtn} onPress={() => openModal()}>
          <Ionicons name="add-circle" size={30} color="green" />
          <Text style={styles.text}>Add new cocktail</Text>
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
  bg: {
    height:'100%',
    backgroundColor: '#354b63'
  },
  addBtn: {
    marginTop: 10,
    width: '45%',
    borderRadius: 5,
    flexDirection: 'row',
      alignItems:'flex-start',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color:'#dce3de'
  },
    list: {
      marginBottom: 115
    },
    image: {
      width: 50,
      height: 50,
      borderRadius:150
    },
    container : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomColor: '#cfcfcf',
      borderBottomWidth: 1,
    },
    listContent : {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
    },
    name: {
      marginLeft: 5,
      fontSize: 15,
      color:'#dce3de'
    },
    deleteBtn: {
      marginRight: 15
    }
});


export default MyCocktails