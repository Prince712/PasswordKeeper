import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import {AuthContext} from '../navigators/AuthProvider';

export default function Profile({navigation}) {
  const {logout} = useContext(AuthContext);
  // console.log("props",props);
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
