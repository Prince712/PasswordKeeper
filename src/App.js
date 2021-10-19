import React from 'react';
import {
 
  StyleSheet,
  // useColorScheme,
  View,
} from 'react-native';
import {extendTheme, NativeBaseProvider} from 'native-base';
import AuthProvider from './navigators/AuthProvider';
import Routes from './navigators/Routes';

const newColorTheme = {
  brand: {
    900: '#FFFFFF',
    800: '#000000',
    700: '#000000',
  },
};
const colorTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },

    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
const theme = extendTheme({colors: colorTheme});
// 3. Pass the `theme` prop to the `NativeBaseProvider`

// Handle user state changes

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark'; 
 
 
  return(
      <NativeBaseProvider theme={colorTheme}>
          <AuthProvider>
              <Routes/>
          </AuthProvider> 
      </NativeBaseProvider>
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
