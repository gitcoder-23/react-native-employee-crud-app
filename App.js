/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
//  redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createStackNavigator();

const myOptions = {
  title: 'Employee Desk',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff',
  },
};

function App() {
  return (
    <View style={styles.container}>
      {/* 'headerMode="none"' is deprecated in version 6.x headerShown="false"*/}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: 'Create Employee' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: 'Employee Profile' }}
        />
      </Stack.Navigator>
      {/* <Home /> */}
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <>
      {/* <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider> */}
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ebebeb',
    backgroundColor: '#e0e0e0',
    // to maintain contain text
    // marginTop: Constants.statusBarHeight,
    // row wise
    // alignItems: 'center',
    // row wise
    // flexDirection: 'row',
    // Column wise
    // justifyContent: 'center',
  },
});
