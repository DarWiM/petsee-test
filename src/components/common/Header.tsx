import React, {FC} from 'react';
import {ViewProps, ViewStyle} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import CloseButton from '@/components/common/CloseButton';
import Row from '@/components/common/Row';
import {scale} from '@/functions';
import Heading from '@/components/text/Heading';

type THeaderProps = {
  animatedIndex: SharedValue<number>;
  title: string | undefined;
  onPressClose?: () => void;
};

export const Header: FC<THeaderProps> = ({
  title,
  animatedIndex,
  onPressClose,
}) => {
  const animatedProps = useAnimatedProps((): Partial<ViewProps> => {
    return {
      pointerEvents: animatedIndex.value === 1 ? 'auto' : 'none',
    };
  });

  const animatedStyle = useAnimatedProps((): Partial<ViewStyle> => {
    const opacity = interpolate(
      animatedIndex.value,
      [0.9, 1],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {opacity};
  });

  return (
    <HeaderRow>
      <HeaderHeading>{title}</HeaderHeading>
      <Animated.View animatedProps={animatedProps} style={animatedStyle}>
        <CloseButton onPress={onPressClose} />
      </Animated.View>
    </HeaderRow>
  );
};

const HeaderRow = styled(Row)`
  margin-bottom: ${scale(22)}px;
`;

const HeaderHeading = styled(Heading)`
  flex-grow: 1;
  flex-shrink: 1;
`;
