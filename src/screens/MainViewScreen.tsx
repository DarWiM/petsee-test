import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import Map from '@/components/map/Map';
import Pin from '@/components/map/Pin';
import Loader from '@/components/common/Loader';
import {baseCss} from '@/styles';
import {useMainViewScreen} from '@/hooks/useMainViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MainViewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const {mapRef, data, isLoading, onMapReady, getOnItemPress} =
    useMainViewScreen();

  const markers = useMemo(() => {
    return data?.map(item => {
      const onPress = getOnItemPress(item);

      return (
        <Pin
          key={item.id}
          id={item.id}
          latitude={item.latitude}
          longitude={item.longitude}
          color={item.color}
          onPress={onPress}
        />
      );
    });
  }, [data, getOnItemPress]);

  return (
    <Container>
      <Map ref={mapRef} onMapReady={onMapReady} mapPadding={insets}>
        {markers}
      </Map>

      {isLoading && <Loader />}
    </Container>
  );
};

const Container = styled.View`
  ${baseCss.flex};
`;

export default MainViewScreen;
