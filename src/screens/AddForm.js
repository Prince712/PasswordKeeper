import React, {useState, useContext, useRef, useLayoutEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {
  Box,
  VStack,
  Switch,
  HStack,
  Text,
  FormControl,
  useTheme,
  useToast,
  IconButton,
  Icon,
  Button,
} from 'native-base';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import {ShowToast, ShowToastError} from '../Components/ShowToast';
import {addCard, updateCard} from '../Actions/CardCrud';
import {AuthContext} from '../navigators/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

export default function AddForm({route, navigation}) {
  console.log(route);
  let item = route?.params?.item || null;
  // console.log('item',item)
  const {colors} = useTheme();
  const [title, settitle] = useState(item ? item.title : '');
  const [loginId, setloginId] = useState(item ? item.loginId : '');
  const [password, setpassword] = useState(item ? item.password : '');
  const [showPassword, setshowPassword] = useState(false);
  const [favourite, setfavorite] = useState(
    item && item.favourite == true ? true : false,
  );
  const [loading, setloading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [show, setShow] = useState(false);
  const Toast = useToast();
  const {user} = useContext(AuthContext);

  let inputRef = useRef();

  const handleCancelButtonPress = () => {
    setisEditing(false);
    if (item) {
      settitle(item.title);
      setloginId(item.loginId);
      setpassword(item.password);
      setfavorite(item.favourite);
    }
  };

  const handleButtonPress = () => {
    if (title == '') {
      ShowToast('Title can not be empty!', Toast);
      return;
    } else if (loginId == '') {
      ShowToast('Login id can not be empty!', Toast);
      return;
    } else if (password == '') {
      ShowToast('Password can not be empty!', Toast);
      return;
    }
    // console.log(user);
    setloading(true);

    let params = {
      userId: user.uid,
      title,
      loginId,
      password,
      favourite,
      createdAt: firestore.Timestamp.fromDate(new Date()),
    };

    if (item != null) {
      params = {
        title,
        loginId,
        password,
        favourite,
      };

      updateCard(item.id, params)
        .then(r => {
          setloading(false);
          setisEditing(false);
          ShowToast('Card updated successfully', Toast, 'success');
          // settitle('');
          // setloginId('');
          // setpassword('');
          // setfavorite(false);
        })
        .catch(e => {
          setloading(false);
          ShowToastError('Something went wrong!', Toast);
        });
      return;
    }

    addCard(params)
      .then(r => {
        setloading(false);
        ShowToast('Card added successfully', Toast, 'success');
        settitle('');
        setloginId('');
        setpassword('');
        setfavorite(false);
      })
      .catch(e => {
        setloading(false);
        ShowToastError('Something went wrong!', Toast);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {
            item && !isEditing && (
              <IconButton
                onPress={() => setisEditing(!isEditing)}
                icon={
                  <Icon
                    as={AntDesign}
                    name="edit"
                    size="sm"
                    color="primary.500"
                  />
                }
                title={'edit'}
              />
            )
            //  <Button   size="sm" onPress={() => setisEditing(!isEditing)}> Edit </Button>
            //  <Button leftIcon={<Icon name="edit" as={AntDesign}  size="sm" color='white' />}>
            //   </Button>
          }
        </>
      ),
    });
  }, [navigation, isEditing]);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    ShowToast('Copied successfully', Toast, 'success');
  };

  let isReadOnly = item && !isEditing ? true : false;

  return (
    <KeyboardAvoidingView
      style={{backgroundColor: '#f5f3ff'}}
      flex={1}
      contentContainerStyle={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView>
        <Box safeArea flex={1} p="4" w="100%" mx="auto" py="8">
          <FormInput
            // shadow={3}
            lableValue={'Title'}
            isReadOnly={isReadOnly}
            defvalue={title}
            placeholder="eg.Google,Fb,Bank Name etc."
            onChangeText={value => settitle(value)}
            onSubmitEditing={() => {
              // inputRef.focus();
            }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="title" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <FormInput
            ref={inputRef}
            // ref={(input) => { inputRef = input; }}
            // shadow={1}
            isReadOnly={isReadOnly}
            lableValue={'Login id'}
            defvalue={loginId}
            placeholder="eg.email,Bank account number etc."
            onChangeText={value => setloginId(value)}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Icon
                as={<MaterialIcons name={'content-copy'} />}
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => copyToClipboard(loginId)}
              />
            }
          />

          <FormInput
            // shadow={3}
            isReadOnly={isReadOnly}
            lableValue={'Password'}
            defvalue={password}
            placeholder="Password"
            type={show ? 'text' : 'password'}
            onChangeText={value => setpassword(value)}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <HStack>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
                <Icon
                  as={<MaterialIcons name={'content-copy'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => copyToClipboard(password)}
                />
              </HStack>
            }
          />
          <HStack
            alignItems="center"
            borderWidth={1}
            borderColor="coolGray.500"
            alignContent="center"
            space={1}
            mt={3}
            p={2}
            rounded="sm">
            <Icon
              as={<MaterialIcons name="favorite" />}
              size={5}
              ml="0"
              color="muted.400"
            />
            <Text fontWeight={800} color="muted.700" fontSize="xs">
              {' '}
              Mark as favourite :{' '}
            </Text>
            <Switch
              isDisabled={isReadOnly}
              size={Platform.OS == 'ios' ? 'sm' : 'md'}
              ml={5}
              isChecked={favourite}
              onToggle={() => setfavorite(!favourite)}
            />
          </HStack>
          {(!item || isEditing) && (
            <VStack mt={10}>
              <FormButton
                title={'Save'}
                onPress={handleButtonPress}
                isLoading={loading}
                _loading={{
                  bg: 'amber.400:alpha.70',
                  _text: {
                    color: 'coolGray.700',
                  },
                }}
                _spinner={{
                  color: 'white',
                }}
                isLoadingText="Saving..."
              />

              {isEditing && (
                <FormButton
                  colorScheme="danger"
                  isDisabled={loading ? true : false}
                  title={'Cancel'}
                  mt={-3}
                  onPress={handleCancelButtonPress}
                />
              )}
            </VStack>
          )}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
