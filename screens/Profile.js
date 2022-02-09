/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import axios from 'axios';

const Profile = (props) => {
  const [showBox, setShowBox] = useState(true);
  const { _id, name, email, picture, phone, salary, position } =
    props.route.params.item;
  // console.log('_id->', _id);
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel: ${phone}`);
    } else {
      Linking.openURL(`telprompt: ${phone}`);
    }
  };

  const deleteEmployee = () => {
    // console.log('delete');
    // fetch(`https://react-native-server-api.herokuapp.com/api/v1/delemp`, {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     id: _id,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((deleteEmp) => {
    //     console.log('deleteEmp', deleteEmp);
    //     Alert.alert(`${deleteEmp.name} deleted`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     Alert.alert(`Something went wrong`);
    //   });
    if (
      Alert.alert(
        'Are your sure?',
        'Do you want to delete?',
        [
          {
            text: 'Yes',
            onPress: () => {
              setShowBox(false);
              axios
                .delete(
                  `https://react-native-server-api.herokuapp.com/api/v1/delemployee/${_id}`
                )
                .then((deleteEmp) => {
                  const { employee, message, success } = deleteEmp.data;
                  console.log('deleteEmp', deleteEmp);
                  if (success == true) {
                    if (employee.name == '') {
                      Alert.alert(`${message}`);
                    } else {
                      Alert.alert(`${employee.name} deleted`);
                    }

                    props.navigation.navigate('Home');
                  }
                })
                .catch((err) => {
                  console.log(err);
                  Alert.alert(`Something went wrong`);
                });
            },
          },
          {
            text: 'No',
          },
        ],
        { cancelable: false }
      )
    ) {
      return;
    }
  };
  return (
    <>
      <View style={styles.root} key={_id}>
        <LinearGradient
          colors={['#0033ff', '#6bc1ff']}
          style={{ height: '20%' }}
        />
        {showBox && <View style={styles.box}></View>}
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 140,
              height: 140,
              borderRadius: 140 / 2,
              marginTop: -50,
            }}
            source={{
              uri: `${picture}`,
            }}
          />
        </View>
        <View style={styles.empName}>
          <Title>{name}</Title>
          <Text style={styles.myUpText}>{position}</Text>
        </View>
        <Card
          style={styles.myCard}
          onPress={() => {
            Linking.openURL(`mailto: ${email}`);
          }}
        >
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="#006aff" />
            <Text style={styles.myText}>{email}</Text>
          </View>
        </Card>
        <Card style={styles.myCard} onPress={() => openDial()}>
          <View style={styles.cardContent}>
            <Entypo name="phone" size={32} color="#006aff" />
            <Text style={styles.myText}>{phone}</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={32} color="#006aff" />
            <Text style={styles.myText}>{salary}</Text>
          </View>
        </Card>
        <View style={styles.myButton}>
          <Button
            icon="account-edit"
            mode="contained"
            theme={theme}
            onPress={() => {
              props.navigation.navigate('Create', {
                _id: _id,
                name: name,
                email: email,
                picture: picture,
                phone: phone,
                salary: salary,
                position: position,
              });
            }}
          >
            Edit
          </Button>
          <Button
            icon="delete"
            mode="contained"
            theme={theme}
            onPress={() => deleteEmployee()}
          >
            Fire Employee
          </Button>
        </View>
      </View>
    </>
  );
};

export default Profile;

const theme = {
  colors: {
    primary: '#006aff',
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  empName: {
    alignItems: 'center',
    margin: 15,
  },
  myUpText: {
    fontSize: 18,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
  myButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
