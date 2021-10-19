import React from 'react';
import { View, Text } from 'react-native';
import { FormControl ,Input} from 'native-base';

export default function FormInput({lableValue,defvalue,...rest}) {
  return (
    <FormControl mb={5}>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'md', fontWeight: 800}}>
             {lableValue}
            </FormControl.Label>
            <Input {...rest} value={defvalue} />
    </FormControl>

  );
}
