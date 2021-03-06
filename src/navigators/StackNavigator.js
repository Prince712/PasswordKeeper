import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import AddForm from '../screens/AddForm';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddForm"
        component={AddForm}
        options={({ route }) => ({ title: route?.params?.item ? route.params.item.title : 'Add Card' })}
      />
    </Stack.Navigator>
  );
};
