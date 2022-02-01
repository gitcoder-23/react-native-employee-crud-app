import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import React from 'react';
import { Card, FAB } from 'react-native-paper';

const Home = () => {
  const dummyData = [
    {
      id: 1,
      name: 'Mark',
      position: 'Software Developer',
    },
    {
      id: 2,
      name: 'Huge',
      position: 'Web Developer',
    },
    {
      id: 3,
      name: 'Lara',
      position: 'UI Developer',
    },
    {
      id: 4,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 5,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 6,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 7,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 8,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 9,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 10,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 11,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 12,
      name: 'Manderin',
      position: 'UX Developer',
    },
    {
      id: 13,
      name: 'Manderin',
      position: 'UX Developer',
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
        <Card style={styles.myCard} key={item.id}>
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
    <View>
      {/* {renderList} */}
      {/* it provides scrollview */}
      <FlatList
        data={dummyData}
        renderItem={({ item }) => {
          // check inside of compiler
          // console.log('dummyData->', item)
          return renderList(item);
        }}
        keyExtractor={(item) => `${item.id}`}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{
          colors: {
            accent: '#006aff',
          },
        }}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default Home;
// for error checking
const styles = StyleSheet.create({
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
