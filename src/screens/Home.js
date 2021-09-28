import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({navigation}) {
  // console.log("props",props);
  return (
    <View style={styles.container}>
      <Icon name="heart-outline" size={30} />
      <Text>Home</Text>
      <Button
        title="Goto Add Form"
        onPress={() => navigation.navigate('AddForm')}
      />
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
