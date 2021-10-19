import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { Text } from 'react-native';
import {extendTheme, NativeBaseProvider} from 'native-base';

export default function Providers() {

return  <Routes />;

  return (
    <NativeBaseProvider >
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </NativeBaseProvider>
  );
}

// const Providers = () => {
//   return (
   
//   );
// }

// export default Providers;