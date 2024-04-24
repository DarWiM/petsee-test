import {Dimensions} from 'react-native';
import {LatLng} from 'react-native-maps';

const {width} = Dimensions.get('window');

export function scale(value: number) {
  const wishScreenWidth = 390;
  const division = wishScreenWidth / value;
  return width / division;
}

export function getMinMaxCoordinates<ItemT extends LatLng>(items: ItemT[]) {
  const [first] = items;
  return items.reduce(
    ([min, max], item) => {
      return [
        {
          latitude: item.latitude < min.latitude ? item.latitude : min.latitude,
          longitude:
            item.longitude < min.longitude ? item.longitude : min.longitude,
        },
        {
          latitude: item.latitude > max.latitude ? item.latitude : max.latitude,
          longitude:
            item.longitude > max.longitude ? item.longitude : max.longitude,
        },
      ];
    },
    [
      {latitude: first.latitude, longitude: first.longitude},
      {latitude: first.latitude, longitude: first.longitude},
    ],
  );
}
