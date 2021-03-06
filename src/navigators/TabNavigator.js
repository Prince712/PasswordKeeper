import React from 'react';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import Profile from '../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'ios-heart-sharp' : 'ios-heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'person-circle-sharp'
              : 'person-circle-outline';
             
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4c1d95',
        tabBarInactiveTintColor: 'gray',
        // headerShown: false,
        // headerMode: 'screen'
      })}>
      <Tab.Screen name="Home" component={Home}  options={{headerShown: false}}
      // options={{headerTitle:'Password Keeper',headerTitleAlign:'left'}}  
      />
      <Tab.Screen name="Favourite" component={Favourite} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}
