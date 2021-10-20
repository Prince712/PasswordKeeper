import React from 'react';
import { View, Text } from 'react-native';
import { FormControl ,Input} from 'native-base';

export default function FormInput({lableValue,defvalue,refs,...rest}) {
  return (
    <FormControl mb={5}>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'md', fontWeight: 700}}>
             {lableValue}
            </FormControl.Label>
            <Input ref={refs} pl={2}  {...rest} value={defvalue} color= 'coolGray.800' bg={'primary.100'} />
    </FormControl>

  );
}
