import React, {useState} from 'react';
import {View,KeyboardAvoidingView, ScrollView, TextInput} from 'react-native';
import {Box, VStack,Switch, HStack,Text,FormControl,useTheme} from 'native-base';
import FormInput from '../Components/FormInput';

export default function AddForm() {
  const { colors } = useTheme();
  const [title, settitle] = useState('');
  const [loginId, setloginId] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [favourite, setfavorite] = useState(false);

  return (
    <KeyboardAvoidingView
      // style={{backgroundColor:primary.500}}
      flex={1}
      contentContainerStyle={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView>
        <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8" bg='primary.50'>
          <FormInput
            lableValue={'Title'}
            defvalue={title}
            placeholder="eg.Google,Fb,Bank Name etc."
            onChangeText={value => settitle(value)}
          />

          <FormInput
            lableValue={'Login id'}
            defvalue={loginId}
            placeholder="eg.email,Bank account number etc."
            onChangeText={value => setloginId(value)}
          />

          <FormInput
            lableValue={'Password'}
            defvalue={password}
            placeholder="eg.email,Bank account number etc."
            onChangeText={value => setpassword(value)}
          />
           <HStack alignItems="center" alignContent='center' space={4} >           
            <Text fontWeight={800}  color='muted.700' fontSize= 'xs'>  Mark as favourite </Text>
            <Switch size="sm" />
          </HStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
