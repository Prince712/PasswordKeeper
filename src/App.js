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
import AuthNavigator from './navigators/AuthNavigator';
import { extendTheme, NativeBaseProvider } from 'native-base';


const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({ colors: newColorTheme });
// 3. Pass the `theme` prop to the `NativeBaseProvider`

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
    <NativeBaseProvider theme={theme}>
      <AuthNavigator/>
    </NativeBaseProvider>
      {/* <HomeStack /> */}
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
