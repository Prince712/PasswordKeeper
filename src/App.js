import React, {useState, useEffect} from 'react';
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
import {extendTheme, NativeBaseProvider} from 'native-base';
import auth from '@react-native-firebase/auth';
import AuthProvider from './navigators/AuthProvider';

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({colors: newColorTheme});
// 3. Pass the `theme` prop to the `NativeBaseProvider`

// Handle user state changes

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>{!user ? <AuthNavigator /> : <HomeStack />}</AuthProvider>
      </NativeBaseProvider>
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
