import camera from '../assets/camera.png'; 
import imageGallery from '../assets/image-gallery.png'; 
import { useState } from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMyCocktailsContext } from "../context/MyCocktailsContext";
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const ModalForm = ({modalVisible, closeModal}) => {
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ pickerURI, setPickerURI ] = useState('');
    const [ingredients, setIngredients] = useState([
      {strIngredient: '',
      strMeasure: '',
      }
    ])
    const [error, setError] = useState('')

    const { onAdd } = useMyCocktailsContext()

    const handlerCloseModal = () => {
      setTitle('')
      setInstructions('')
      setPickerURI('')
      setIngredients([
        {strIngredient: '',
        strMeasure: '',
        }
      ])
      setError('')
        closeModal()
    }
    
    const handlerOnAdd = () => {
      const regex = new RegExp(/^\s*$/)

      if (regex.test(title)) {
        setError('Name required');
        return
      }
      if (regex.test(instructions)) {
        setError('Instructions required');
        return
      }
      if (regex.test(pickerURI)) {
        setError('Image required');
        return
      }
      if (regex.test(ingredients[0].strIngredient)) {
        setError('at least one ingredient is required');
        return
      }
      if (regex.test(ingredients[0].strMeasure)) {
        setError('measure ingredient required');
        return
      }


        onAdd(title, instructions, pickerURI, ingredients) 
        handlerCloseModal()
    }

    const galleryPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          [{ text: "Ok" }]
        );
        return false;
      }
      return true;
    };
    const cameraPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          [{ text: "Ok" }]
        );
        return false;
      }
      return true;
    };

    const handlerOpenGallery = async () => {
      const isGalleryOK = await galleryPermissions();
      if (!isGalleryOK) return;

      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 16],
        quality: 0.8,
      });

      setPickerURI(image.uri);
    };
    const handlerTakeImage = async () => {
      const isCameraOK = await cameraPermissions();
      if (!isCameraOK) return;

      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 16],
        quality: 0.8,
      });

      setPickerURI(image.uri);
    };

    const addInput = () => {
      setIngredients([...ingredients, {strIngredient: '', strMeasure:''}])
    }
    
    const handleChangeI = (newIngredient, index) => {
      const newIngredients = [...ingredients]
      newIngredients[index].strIngredient = newIngredient;
      setIngredients(newIngredients);
    }
    const handleChangeM = (newMeasure, index) => {
      const newMeasures = [...ingredients]
      newMeasures[index].strMeasure = newMeasure;
      setIngredients(newMeasures);

    }
    const renderItem = ({item, index}) => {
      return(
      <View style={styles.ingredientsContainer}>
      <TextInput
      
      value={item.ing}
        style={styles.ingredientsInput}
        placeholder="Ingredient"
        onChangeText={(e) => handleChangeI(e, index)}
        placeholderTextColor="#dce3de"
      />
      <TextInput
      value={item.mea}
        style={styles.ingredientsInput}
        placeholder="Measure"
        onChangeText={(e) => handleChangeM(e, index)}
        placeholderTextColor="#dce3de"
      />
      </View>)
}

  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.bg}>
      <View style={styles.modal}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#dce3de"
          />
        <TextInput
          style={styles.textInput}
          placeholder="Instructions"
          value={instructions}
          onChangeText={setInstructions}
          placeholderTextColor="#dce3de"
        />

        <Text style={styles.text}>Choose your cocktail Image:</Text>

        <View>
          {!pickerURI ? (
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={handlerOpenGallery}>
                <Image style={styles.img} source={imageGallery} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerTakeImage}>
                <Image style={styles.img} source={camera} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setPickerURI('')}>
              <Image style={styles.photo} source={{ uri: pickerURI }} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.ingredientsContainer}>
          <FlatList
            data={ingredients}
            style={styles.list}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
          />
          <TouchableOpacity onPress={addInput}>
            <Ionicons name="add-circle" size={30} color="lightblue" />
          </TouchableOpacity>
        </View>

        {!!error && (
          <Text style={{ color: "red", margin: 15 }}>{error}</Text>
        )}

        <View style={styles.buttons}>
          <Button
            style={styles.btn}
            onPress={handlerCloseModal}
            title="Dismiss"
            color="#808080"
            accessibilityLabel="dismiss"
          />
          <Button
            style={styles.btn}
            onPress={handlerOnAdd}
            title="Add"
            color="#23bf00"
            accessibilityLabel="add"
          />
        </View>
      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#223040',
    height:'100%'
  },
  modal: {
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFFF",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:'#354b63'
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor:'grey',
    width: '80%',
    padding: 3,
    color:"#dce3de"
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginBottom: 30,
    width:'95%'
  },
  ingredientsInput: {
    borderBottomWidth: 1,
    width: '45%',
    padding: 3,
    borderColor:'grey',
    color: "#dce3de"
  },
  img: {
    height: 60,
    width: 60,
    margin: 12,
},
photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
photo: {
    borderRadius: 150,
    height: 80,
    width: 80,
    margin: 12,
    },
    text: {
      textAlign: 'center',
      marginTop: 10,
      color:'#dce3de'

  },
  list: {
    height: 200
  },
  buttons: {
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
  },
  btn : {
    borderRadius:20,
    color: 'red',
    width: '100%',
  }
});

export default ModalForm