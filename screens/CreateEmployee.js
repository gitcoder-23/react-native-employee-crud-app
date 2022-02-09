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
  // console.log(props);

  // For Edit Start
  const { navigation, route } = props;

  const getDetails = (type) => {
    if (route.params) {
      // console.log('route.params->', route.params);
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.phone;
        case 'email':
          return route.params.email;
        case 'salary':
          return route.params.salary;
        case 'picture':
          return route.params.picture;
        case 'position':
          return route.params.position;
      }
    } else {
      return '';
    }
  };

  const updateData = () => {
    fetch(
      `https://react-native-server-api.herokuapp.com/api/v1/update/${route.params._id}`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: route.params._id,
          name: name,
          email: email,
          phone: phone,
          salary: salary,
          picture: picture,
          position: position,
        }),
      }
    )
      .then((resPost) => resPost.json())
      .then((upData) => {
        // console.log('upData->', upData);

        Alert.alert(`Employee ${upData.employee.name} updated`);
        setName('');
        setEmail('');
        setSalary('');
        setPicture('');
        setPosition('');
        setImage(null);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
        console.log(err);
      });
  };

  // Edit End

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [salary, setSalary] = useState(getDetails('salary'));
  const [picture, setPicture] = useState(getDetails('picture'));
  const [position, setPosition] = useState(getDetails('position'));
  const [modal, setModal] = useState(false);
  const [afterUploadImg, setAfterUploadImg] = useState(false);
  const [uploadtext, setUploadtext] = useState(false);
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
      .then((res) => res.json())
      .then((data) => {
        console.log('upCloud->', data);
        // setApiUploadStatus('Upload Image');
        // if (apiStatus === 200) {
        //   setPicture(data.url);
        //   setModal(false);
        // }
        setPicture(data?.url);
        setAfterUploadImg(true);
        setUploadtext(true);
        setTimeout(() => {
          setUploadtext(false);
        }, 2000);
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
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
        console.log(err);
      });
  };

  const pictureImage = () => {
    return (
      <>
        {picture !== '' && afterUploadImg == false ? (
          <>
            {route.params && (
              <Image
                source={{ uri: route.params.picture }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                }}
              />
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </>
    );
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

        {pictureImage()}

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
          Upload Image
          {/* {uploadtext == true ? 'Uploaded' : 'Upload Image'} */}
        </Button>
        {route.params ? (
          <Button
            icon="content-save"
            style={styles.importStyle}
            theme={theme}
            mode="contained"
            onPress={() => updateData()}
          >
            Update
          </Button>
        ) : (
          <Button
            icon="content-save"
            style={styles.importStyle}
            theme={theme}
            mode="contained"
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}

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
