import React from 'react';
import {View,  StyleSheet} from 'react-native';
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
} from 'native-base';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormInput from '../Components/FormInput';
export default function Home({navigation}) {
  // console.log("props",props);
  return (
    <View style={styles.container}>
      <VStack width="100%" space={5} px={2} alignItems="center">      
     
         <FormInput  
         placeholder="Search cards by name"
         InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }/>      
      </VStack>
      {/* <Icon name="heart-outline" size={30} /> */}
     
      {/* <Button
        title="Goto Add Form"
        onPress={() => navigation.navigate('AddForm')}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
