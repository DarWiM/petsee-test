import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import styled from 'styled-components/native';

export type LoaderProps = Pick<ActivityIndicatorProps, 'size' | 'color'>;

const Loader: React.FC<LoaderProps> = ({size = 'large', color = '#fff'}) => {
  return (
    <Container entering={FadeIn} exiting={FadeOut}>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
};

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export default Loader;
