import React from 'react';
import { View, Text } from 'react-native';
import { Button, ButtonGroup } from 'native-base';
export default function FormButton({title,...rest}) {
  return (
    <Button m={5} {...rest}>{title}</Button>
  );
}
