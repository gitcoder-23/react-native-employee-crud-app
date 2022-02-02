import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = () => {
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel: 9857485714');
    } else {
      Linking.openURL('telprompt: 9857485714');
    }
  };
  return (
    <>
      <View style={styles.root}>
        <LinearGradient
          colors={['#0033ff', '#6bc1ff']}
          style={{ height: '20%' }}
        />
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 140,
              height: 140,
              borderRadius: 140 / 2,
              marginTop: -50,
            }}
            source={{
              uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
            }}
          />
        </View>
        <View style={styles.empName}>
          <Title>Rahul Verma</Title>
          <Text style={styles.myUpText}>Software Developer</Text>
        </View>
        <Card
          style={styles.myCard}
          onPress={() => {
            Linking.openURL('mailto: rahul@yahoo.com');
          }}
        >
          <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="#006aff" />
            <Text style={styles.myText}>rahul@yahoo.com</Text>
          </View>
        </Card>
        <Card style={styles.myCard} onPress={() => openDial()}>
          <View style={styles.cardContent}>
            <Entypo name="phone" size={32} color="#006aff" />
            <Text style={styles.myText}>9857485714</Text>
          </View>
        </Card>
        <Card style={styles.myCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={32} color="#006aff" />
            <Text style={styles.myText}>8LPA</Text>
          </View>
        </Card>
        <View style={styles.myButton}>
          <Button
            icon="account-edit"
            mode="contained"
            theme={theme}
            onPress={() => console.log('edit')}
          >
            Edit
          </Button>
          <Button
            icon="delete"
            mode="contained"
            theme={theme}
            onPress={() => console.log('delete')}
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
