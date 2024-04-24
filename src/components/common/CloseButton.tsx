import React, {FC} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';
import {scale} from '@/functions';
import Svg, {Rect, SvgProps} from 'react-native-svg';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

const CloseButton: FC<TouchableOpacityProps> = props => (
  <Touchable {...props}>
    <Icon />
  </Touchable>
);

const Touchable = styled(TouchableOpacity)`
  border-radius: ${scale(15)}px;
  background: rgba(0, 0, 0, 0.19);
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
`;

const Icon = (props: SvgProps) => (
  <Svg width={13} height={13} fill="none" {...props}>
    <Rect
      width={1.849}
      height={16.637}
      y={1.307}
      fill="#000"
      rx={0.924}
      transform="rotate(-45 0 1.307)"
    />
    <Rect
      width={1.849}
      height={16.637}
      y={1.307}
      fill="#000"
      rx={0.924}
      transform="rotate(-45 0 1.307)"
    />
    <Rect
      width={1.849}
      height={16.637}
      fill="#000"
      rx={0.924}
      transform="scale(-1 1) rotate(-45 -4.958 16.432)"
    />
    <Rect
      width={1.849}
      height={16.637}
      fill="#000"
      rx={0.924}
      transform="scale(-1 1) rotate(-45 -4.958 16.432)"
    />
  </Svg>
);

export default CloseButton;
