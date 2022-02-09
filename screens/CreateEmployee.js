import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

const CreateEmployee = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [position, setPosition] = useState('');
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);

  const pickFromGalary = async () => {
    console.log('Galary');
    let data = await ImagePicker.launchImageLibraryAsync({
      // All insteed of images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      aspect: [1, 1],
      // quality: 1,
      quality: 0.5,
    });

    console.log('pickFromGalary->', data);

    if (!data.cancelled) {
      setImage(data?.uri);
      console.log('filesplit', data.uri.split('.')[3]);
      // add type of file
      let newFile = {
        uri: data?.uri,
        // image file split and make array
        type: `employees/${data.uri.split('.')[1]}`,
        name: `employeesimg-${Date.now()}.${data.uri.split('.')[1]}`,
      };
      handleUploadCloud(newFile);
    }
  };

  const pickFromCamera = async () => {
    console.log('Camera');
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      aspect: [1, 1],
      quality: 0.5,
    });

    console.log('pickFromCamera->', data);
    if (!data.cancelled) {
      setImage(data?.uri);
      // console.log('filesplit', data.uri.split('.')[3]);
      // add type of file
      let newFile = {
        uri: data.uri,
        // image file split and make array
        type: `employees/${data.uri.split('.')[1]}`,
        name: `employeesimg-${Date.now()}.${data.uri.split('.')[1]}`,
      };
      handleUploadCloud(newFile);
    }
  };

  const handleUploadCloud = (image) => {
    const data = new FormData();
    data.append('file', image);
    // "employeeApp" taken from cloudinary
    data.append('upload_preset', 'employeeApp');
    data.append('cloud_name', 'drcloud21');

    fetch('https://api.cloudinary.com/v1_1/drcloud21/image/upload', {
      method: 'post',
      body: data,
    })
      // axios
      //   .post('https://api.cloudinary.com/v1_1/drcloud21/image/upload', data)
      .then((res) => res.json())
      .then((data) => {
        console.log('upData->', data);
        // setApiUploadStatus('Upload Image');
        // if (apiStatus === 200) {
        //   setPicture(data.url);
        //   setModal(false);
        // }
        setPicture(data?.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert(`Error while uploading ${err}`);
        // console.log(err);
      });
  };

  const submitData = () => {
    fetch('https://react-native-server-api.herokuapp.com/api/v1/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        salary: salary,
        picture: picture,
        position: position,
      }),
    })
      .then((resPost) => resPost.json())
      .then((postData) => {
        // console.log('postData->', postData.employee.name);
        Alert.alert(`Employee ${postData.employee.name} saved`);
        setName('');
        setEmail('');
        setSalary('');
        setPicture('');
        setPosition('');
        setImage(null);
        props.navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
        // console.log(err);
      });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="position">
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
        <TextInput
          label="Position"
          mode="outlined"
          theme={theme}
          style={styles.importStyle}
          value={position}
          onChangeText={(text) => setPosition(text)}
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
          icon={picture == '' ? 'upload' : 'check'}
          style={styles.importStyle}
          theme={theme}
          mode="contained"
          onPress={() => {
            // console.log('Pressed');
            setModal(true);
          }}
        >
          {/* {picture === '' ? apiUploadStatus : apiUploadStatus} */}
          Upload Image
        </Button>

        <Button
          icon="content-save"
          style={styles.importStyle}
          theme={theme}
          mode="contained"
          onPress={submitData}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateEmployee;
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

const theme = {
  colors: {
    primary: '#006aff',
  },
};
