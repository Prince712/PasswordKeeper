import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  useToast,
  Divider,
} from 'native-base';
import {AuthContext} from '../navigators/AuthProvider';
import {ShowToast} from '../Components/ShowToast';

export default function Login({navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const Toast = useToast();

  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == '') {
      ShowToast('Email can not be empty!', Toast);
      return;
    } else if (!reg.test(email)) {
      ShowToast('Enter Valid email!', Toast);
      return;
    } else if (password == '') {
      ShowToast('Password can not be empty!', Toast);
      return;
    }

    login(email, password);
  };

  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}>
            Email ID
          </FormControl.Label>
          <Input value={email} onChangeText={email => setemail(email)} />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: 'coolGray.800',
              fontSize: 'xs',
              fontWeight: 500,
            }}>
            Password
          </FormControl.Label>
          <Input
            type="password"
            value={password}
            onChangeText={password => setpassword(password)}
          />
          <Link
            _text={{fontSize: 'xs', fontWeight: '500', color: 'indigo.500'}}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          _text={{color: 'white'}}
          onPress={handleLogin}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            // href="#"
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
