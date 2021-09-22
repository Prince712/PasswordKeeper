import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 22}}>
          First Personal Project !
        </Text>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          Save all your passwords at one place with{' '}
          <Text style={{fontWeight: 'bold'}}>Password Keeper</Text> !
        </Text>
        <Text style={{marginTop: 15, textAlign: 'center', fontSize: 12}}>
          This project is using : React-native with react hooks,Firebase for
          authentication and Firestore as backend.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    // backgroundColor:'#ccc'
  },
  
});

export default App;
