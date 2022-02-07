/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, FAB } from 'react-native-paper';
import axios from 'axios';

const Home = (props) => {
  const { navigation } = props;
  const [allEmpData, setAllEmpData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEmployee = () => {
    axios
      .get(`https://react-native-server-api.herokuapp.com/api/v1/employees`)
      .then((res) => {
        // console.log('getAllEmployee->', res.data.employees);
        setAllEmpData(res.data.employees.reverse());
        setLoading(false);
      });
  };

  useEffect(() => {
    //   fetch('https://react-native-server-api.herokuapp.com/api/v1/employees')
    // .then(response => response.json())
    // .then(data => console.log(data));
    getAllEmployee();
  }, []);

  const renderList = (item) => {
    return (
      <>
        <Card
          style={styles.myCard}
          // props pass here ase "item"
          onPress={() => navigation.navigate('Profile', { item: item })}
        >
          <View style={styles.cardView}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
              source={{
                uri: `${item.picture}`,
              }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.position}</Text>
            </View>
          </View>
        </Card>
      </>
    );
  };
  return (
    <View style={styles.root}>
      {/* {renderList} */}
      {/* it provides scrollview */}
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <>
          <FlatList
            data={allEmpData}
            renderItem={({ item }) => {
              return renderList(item);
            }}
            keyExtractor={(item) => item._id}
          />
        </>
      )}
      <FAB
        onPress={() => props.navigation.navigate('Create')}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{
          colors: {
            accent: '#006aff',
          },
        }}
        // onPress={() => console.log('Pressed', props)}
      />
    </View>
  );
};

export default Home;
// for error checking
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  myCard: {
    margin: 5,
    // padding: 5,
  },
  cardView: {
    // flexDirection: 'column',
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 20,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

// const styles = {
//   myCard: {
//     margin: 5,
//     padding: 5,
//   },
// };
