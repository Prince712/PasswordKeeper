import React, {useState,useContext,useRef} from 'react';
import {View,KeyboardAvoidingView, ScrollView, TextInput,Platform} from 'react-native';
import {Box, VStack,Switch, HStack,Text,FormControl,useTheme,useToast,} from 'native-base';
import FormInput from '../Components/FormInput';
import FormButton  from '../Components/FormButton';
import {ShowToast,ShowToastError} from '../Components/ShowToast';
import { addCard } from '../Actions/CardCrud';
import { AuthContext } from '../navigators/AuthProvider';


export default function AddForm() {
  const { colors } = useTheme();
  const [title, settitle] = useState('');
  const [loginId, setloginId] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [favourite, setfavorite] = useState(false);
  const [loading, setloading] = useState(false)
  const Toast = useToast();
  const {user} = useContext(AuthContext);

  let inputRef=useRef();;

  const handleButtonPress = ()=> {
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
    userId : user.uid,
    title,
    loginId,
    password,
    favourite
  }
    addCard(params).then(r => {
        setloading(false);
        ShowToast('Card added successfully', Toast,'success');
        settitle('');
        setloginId('');
        setpassword('');
        setfavorite(false);

    }).
    catch(e=>{
      setloading(false);
      ShowToastError('Something went wrong!', Toast);
    });

  }

  return (
    <KeyboardAvoidingView
      // style={{backgroundColor:'#a78bfa'}}
      flex={1}
      contentContainerStyle={{flex: 1,}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView>
        <Box safeArea flex={1} p="4" w="100%" mx="auto" py="8">
          <FormInput
            shadow={3}
            lableValue={'Title'}
            defvalue={title}
            placeholder="eg.Google,Fb,Bank Name etc."
            onChangeText={value => settitle(value)}
            onSubmitEditing={()=>{
              console.log('dadasdasdasd',inputRef);
              // inputRef.focus();
            }}
          />

          <FormInput
            ref={inputRef}
            // ref={(input) => { inputRef = input; }}
            shadow={3}
            lableValue={'Login id'}
            defvalue={loginId}
            placeholder="eg.email,Bank account number etc."
            onChangeText={value => setloginId(value)}
          />

          <FormInput
            shadow={3}
            lableValue={'Password'}
            defvalue={password}
            placeholder="Password"
            onChangeText={value => setpassword(value)}
          />
           <HStack alignItems="center" borderWidth={1} borderColor="coolGray.500" alignContent='center' space={4} mt={3} p={2.5} bg={'primary.100'} rounded="md" shadow={3}>           
            <Text fontWeight={800}  color='muted.700' fontSize= 'xs'>  Mark as favourite </Text>
            <Switch size={Platform.OS =='ios'?'sm':'md'} isChecked={favourite} onToggle={e=> setfavorite(e)} />
          </HStack>
          <VStack mt={10}>
            <FormButton title={'Save'}  onPress={handleButtonPress} 
             isLoading={loading}
             _loading={{
               bg: "amber.400:alpha.70",
               _text: {
                 color: "coolGray.700",
               },
             }}
             _spinner={{
               color: "white",
             }}
             isLoadingText="Saving..."
            />
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
