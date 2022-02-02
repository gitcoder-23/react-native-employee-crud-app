import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>on your app!</Text> */}
      {/* <Home /> */}
      {/* <CreateEmployee /> */}
      <Profile />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ebebeb',
    backgroundColor: '#e0e0e0',
    // to maintain contain text
    marginTop: Constants.statusBarHeight,
    // row wise
    // alignItems: 'center',
    // row wise
    // flexDirection: 'row',
    // Column wise
    // justifyContent: 'center',
  },
});
