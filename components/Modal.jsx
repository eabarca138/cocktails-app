import camera from '../assets/camera.png'; 
import imageGallery from '../assets/image-gallery.png'; 
import { useState } from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMyCocktailsContext } from "../context/MyCocktailsContext";
import { v4 as uuidv4 } from 'uuid';

const ModalForm = ({modalVisible, closeModal}) => {
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ pickerURI, setPickerURI ] = useState(null);
    const [count, setCount] = useState(1)
    const [inputs, setInputs] = useState([0])

    const [firstIngredient, setfirstIngredient] = useState('')
    const [firstMeasure, setfirstMeasure] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [measures, setMeasures] = useState({})
    const { onAdd } = useMyCocktailsContext()

    const handlerCloseModal = () => {
        setInputs([0])
        setCount('')
        setfirstIngredient('')
        setfirstMeasure('')
        setIngredients('')
        setMeasures('')
        setTitle('')
        setInstructions('')
        setPickerURI(null)
        closeModal()
    }
    
    const handlerOnAdd = () => {
        onAdd(title, instructions, pickerURI, ingredients, measures) 
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
      setCount(count + 1)
      setInputs([...inputs, count])
    }
    
    const handleChangeI = (e) => {
      console.log(e.target.value);
      console.log(e.target.name);
      const value = e.target.value;

      const ingredient = {[e.target.name] : value}
      setIngredients([...ingredients, ingredient]);
    }
    const handleChangeM = (e) => {
      const value = e.target.value;
      setMeasures({
        ...measures,
        [e.target.name]: value
      });
    }
    const renderItem = (i, index) => (
      <View style={styles.ingredientsContainer}>
      <TextInput
        style={styles.ingredientsInput}
        placeholder="Ingredient"
        onChange={handleChangeI} 
      />
      <TextInput
        style={styles.ingredientsInput}
        placeholder="Measure"
        onChange={handleChangeM}
      />
      </View>
    );

  return (
    <Modal animationType="fade" transparent={false} visible={modalVisible}>
      <View style={styles.modal}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Instructions"
          value={instructions}
          onChangeText={setInstructions}
        />

        <Text style={styles.text}>Choose your cocktail photo:</Text>

        <View>
            {!pickerURI ?
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={handlerOpenGallery}>
              <Image style={styles.img} source={imageGallery} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerTakeImage}>
              <Image style={styles.img} source={camera} />
            </TouchableOpacity>
          </View>
            :
          <TouchableOpacity onPress={()=>setPickerURI(null)}>
            <Image style={styles.photo} source={{ uri: pickerURI }} />
          </TouchableOpacity>
          }
        </View>

        <View style={styles.ingredientsContainer}>

        <FlatList
        data={inputs}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(i) => i}
      />
        <TouchableOpacity style={styles.addBtn} onPress={addInput}>
        <Ionicons name="add-circle" size={30} color="lightblue" />
        </TouchableOpacity>

        </View>


    <View style={styles.buttons}>
        <Button
          onPress={handlerCloseModal}
          title="Dismiss"
          color="#808080"
          accessibilityLabel="Descartar"
        />
        <Button
          onPress={handlerOnAdd}
          title="Add"
          color="#23bf00"
          accessibilityLabel="add"
        />
    </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    borderRadius: 20,
    borderWidth: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    width: '80%',
    padding: 3
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginBottom: 30,
    width:'80%'
  },
  ingredientsInput: {
    borderBottomWidth: 1,
    width: '45%',
    padding: 3
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
      marginTop: 10     
  },
  list: {
    height: 200
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
});

export default ModalForm