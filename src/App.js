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
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigators/StackNavigator';
import TabNavigator from './navigators/TabNavigator';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <HomeStack />
      {/* <TabNavigator/> */}
    </NavigationContainer>
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
