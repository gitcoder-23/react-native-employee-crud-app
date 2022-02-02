/* eslint-disable react/prop-types */
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import React from 'react';
import { Card, FAB } from 'react-native-paper';

const Home = (props) => {
  const dummyData = [
    {
      id: 1,
      name: 'Mark',
      email: 'mark@yahoo.com',
      phone: '8757474758',
      salary: '8LPA',
      picture:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
      position: 'Software Developer',
    },
    {
      id: 2,
      name: 'Huge',
      email: 'huge@yahoo.com',
      phone: '7757474758',
      salary: '9LPA',
      picture:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'Web Developer',
    },
    {
      id: 3,
      name: 'Lara',
      email: 'lara@yahoo.com',
      phone: '9757474758',
      salary: '10LPA',
      picture:
        'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'UI Developer',
    },
    {
      id: 4,
      name: 'Manderin',
      email: 'manderin@yahoo.com',
      phone: '7557474758',
      salary: '8LPA',
      picture:
        'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'UX Developer',
    },
    {
      id: 5,
      name: 'Subhash',
      email: 'subhash@yahoo.com',
      phone: '9557474758',
      salary: '16LPA',
      picture:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'QA Analyst',
    },
    {
      id: 6,
      name: 'Prabha',
      email: 'prabha@yahoo.com',
      phone: '6557474758',
      salary: '15LPA',
      picture:
        'https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'UI Developer',
    },
    {
      id: 7,
      name: 'Prity',
      email: 'prity@yahoo.com',
      phone: '4557474758',
      salary: '20LPA',
      picture:
        'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      position: 'DevOps',
    },
  ];

  // const renderList = dummyData.reverse().map((item) => {
  //   return (
  //     <>
  //       <Card style={styles.myCard} key={item.id}>
  //         <View style={styles.cardView}>
  //           <Image
  //             style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
  //             source={{
  //               uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  //             }}
  //           />
  //           <View style={{ marginLeft: 20 }}>
  //             <Text style={styles.text}>{item.name}</Text>
  //             <Text style={styles.text}>{item.position}</Text>
  //           </View>
  //         </View>
  //       </Card>
  //     </>
  //   );
  // });

  const renderList = (item) => {
    return (
      <>
        <Card
          style={styles.myCard}
          // props pass here ase "item"
          onPress={() => props.navigation.navigate('Profile', { item: item })}
        >
          <View style={styles.cardView}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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
      <FlatList
        data={dummyData}
        renderItem={({ item }) => {
          // check inside of compiler
          // console.log('dummyData->', item)
          return renderList(item);
        }}
        keyExtractor={(item) => item.id}
        // keyExtractor={(item) => `${item.id}`}
      />
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
