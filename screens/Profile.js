import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  return (
    <>
      <View style={styles.root}>
        <LinearGradient
          colors={['#0033ff', '#6bc1ff']}
          style={{ height: '20%' }}
        />
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
