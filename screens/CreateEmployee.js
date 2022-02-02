import { StyleSheet, Text, View, Modal, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-Permissions';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const pickFromGalary = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // const [status] = ImagePicker.useMediaLibraryPermissions(null);
    // if (status) {
    //   let data = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [1, 1],
    //     // 0-1
    //     quality: 1,
    //   });
    //   console.log('pickFromGalary', data);
    // } else {
    //   Alert.alert('You need to give up permission to work');
    // }
    console.log('Galary');
    let result = await ImagePicker.launchImageLibraryAsync({
      // All insteed of images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickFromCamera = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    // const [status] = ImagePicker.useCameraPermissions(null);
    // if (status) {
    //   let data = await ImagePicker.launchCameraAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [1, 1],
    //     // 0-1
    //     quality: 0.5,
    //   });
    //   console.log('pickFromCamera', data);
    // } else {
    //   Alert.alert('You need to give up permission to work');
    // }
    console.log('Camera');
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.root}>
      {/* <Text>Create Employee</Text> */}
      <TextInput
        label="Name"
        mode="outlined"
        theme={theme}
        style={styles.importStyle}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        mode="outlined"
        theme={theme}
        style={styles.importStyle}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Phone"
        mode="outlined"
        keyboardType="number-pad"
        theme={theme}
        style={styles.importStyle}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        label="Salary"
        mode="outlined"
        theme={theme}
        style={styles.importStyle}
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
          }}
        />
      )}
      <Button
        icon="upload"
        style={styles.importStyle}
        theme={theme}
        mode="contained"
        onPress={() => {
          // console.log('Pressed');
          setModal(true);
        }}
      >
        Upload Image
      </Button>

      <Button
        icon="content-save"
        style={styles.importStyle}
        theme={theme}
        mode="contained"
        onPress={() => {
          console.log('Save');
        }}
      >
        Save
      </Button>

      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={pickFromCamera}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={pickFromGalary}
            >
              Gallery
            </Button>
          </View>

          <Button
            theme={theme}
            onPress={() => {
              // console.log('Pressed');
              setModal(false);
            }}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default CreateEmployee;

const theme = {
  colors: {
    primary: '#006aff',
  },
};

const styles = StyleSheet.create({
  root: {
    // take complete height
    flex: 1,
  },
  importStyle: {
    margin: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
});
