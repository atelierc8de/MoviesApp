import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function Button({ onPress, children }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}
