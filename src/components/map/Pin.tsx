import React, {useMemo} from 'react';
import {LatLng, Marker} from 'react-native-maps';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';

export type MapPinProps = {
  id: number;
  latitude: number;
  longitude: number;
  color: string;
  onPress: () => void;
};

const Pin: React.FC<MapPinProps> = props => {
  const coordinate: LatLng = useMemo(
    () => ({latitude: props.latitude, longitude: props.longitude}),
    [props.latitude, props.longitude],
  );

  return (
    <Marker
      id={`pin_${props.id}`}
      coordinate={coordinate}
      onPress={props.onPress}>
      <Icon color={props.color} />
    </Marker>
  );
};

const Icon = (props: SvgProps) => (
  <Svg width={54} height={38} fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="currentColor"
        d="M37.924 12.076c-1.083-1.082-2.55-1.354-3.52-.789-2.762 1.609-8.496-2.488-15.05 4.066-6.555 6.555-2.458 12.29-4.067 15.05-.565.971-.293 2.438.79 3.52 1.082 1.083 2.549 1.355 3.52.79 2.76-1.609 8.495 2.488 15.05-4.066 6.554-6.555 2.457-12.29 4.066-15.05.565-.971.293-2.438-.79-3.52Zm-11.492 3.402c-2.728.682-6.272 4.226-6.954 6.954a.75.75 0 1 1-1.456-.364c.817-3.267 4.774-7.228 8.046-8.046a.75.75 0 0 1 .364 1.456Z"
      />
    </G>
    <Defs />
  </Svg>
);

export default Pin;
