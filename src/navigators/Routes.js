import React,{useState,useContext,useEffect} from 'react';
import { View, Text } from 'react-native';
import AuthProvider,{ AuthContext } from './AuthProvider';
import HomeStack from './StackNavigator';
// import TabNavigator from './navigators/TabNavigator';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
export default function Routes() {

const [initializing, setInitializing] = useState(true);
const {user,setUser} = useContext(AuthContext)

const onAuthStateChanged = user => {
    setUser(user);
    console.log("state change",user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // return <Text>hello</Text>
  return (
    <NavigationContainer>         
        {!user ? <AuthNavigator /> : <HomeStack />}
    </NavigationContainer>
  );
}
