import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
  Fab,
} from 'native-base';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormInput from '../Components/FormInput';
import {getAllCards} from '../Actions/CardCrud';
export default function Home({navigation, route, ...props}) {
  const [Cards, setCards] = useState([]);
  const [newAdded, setnewAdded] = useState(false);

  const getData = () => {
    const data = [];
    getAllCards().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let object = {id: documentSnapshot.id, ...documentSnapshot.data()};
        data.push(object);
      });
      setCards(data);
    });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', event => {
      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <Box flex={1} alignItems="center" bg="primary.200">
      {/* //Search barr.................. */}
      <VStack width="95%" alignItems="center">
        <FormInput
          placeholder="Search cards"
          placeholderTextColor={'white'}
          bg={'gray.500'}
          pl={5}
          borderColor="black"
          InputRightElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="white"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
      {/* //Flatlist */}
      <FlatList
        style={{width: '100%', flex: 1}}
        data={Cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AddForm')}
        style={styles.touchableOpacityStyle}>
        <AntDesign
          name="plus"
          size={20}
          style={{fontWeight: 'bold'}}
          color={'#ffffff'}
        />
      </TouchableOpacity>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 30,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    elevation: 7,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
});
