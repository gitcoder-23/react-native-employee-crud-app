import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);
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
              onPress={() => {
                console.log('C-Pressed');
                // setModal(false);
              }}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => {
                console.log('G-Pressed');
                // setModal(false);
              }}
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
