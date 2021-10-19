import React, {useContext,useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import {AuthContext} from '../navigators/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function Profile({navigation,route}) {
  const {user,logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("props",user.uid);

  useEffect(() => {
    getUser();
    // fetchPosts();
    // navigation.addListener("focus", () => setLoading(!loading));
  }, []);
  const getUser = async() => {
    console.log('fetching..');
    await firestore()
    .collection('users')
    .doc( route.params ? route.params.userId : user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
        setLoading(false)
      }
    }).catch(e=>{
      setLoading(false);
      console.log("eeerrr",e);
    })
  }

  return (
    <View style={styles.container}>
      <Text>Welcome  {userData ? userData.firstName :''}</Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
