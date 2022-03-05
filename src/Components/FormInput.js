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
            <Input ref={refs} pl={2}  {...rest}  selectionColor={'#a78bfa'}   value={defvalue} color={'#000'} />
    </FormControl>

  );
}
