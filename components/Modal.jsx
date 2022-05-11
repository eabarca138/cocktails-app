import camera from '../assets/camera.png'; 
import imageGallery from '../assets/image-gallery.png'; 
import { useState } from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMyCocktailsContext } from "../context/MyCocktailsContext";

const ModalForm = ({modalVisible, closeModal}) => {
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ pickerURI, setPickerURI ] = useState(null);
    const [ingredient, setIngredient] = useState('')
    const [measure, setMeasure] = useState('')
    const { onAdd } = useMyCocktailsContext()

    const handlerCloseModal = () => {
        setTitle('')
        setInstructions('')
        setPickerURI(null)
        closeModal()
    }
    
    const handlerOnAdd = () => {
        onAdd(title, instructions, pickerURI)
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
        <TextInput
          style={styles.ingredientsInput}
          placeholder="Ingredient"
          value={ingredient}
          onChangeText={setIngredient}
        />
        <TextInput
          style={styles.ingredientsInput}
          placeholder="Measure"
          value={measure}
          onChangeText={setMeasure}
        />
        <TouchableOpacity style={styles.addBtn} >
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width:'80%'
  },
  ingredientsInput: {
    borderBottomWidth: 1,
    width: '40%',
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
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
});

export default ModalForm