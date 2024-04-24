import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export function scale(value: number) {
  const wishScreenWidth = 390;
  const division = wishScreenWidth / value;
  return width / division;
}
