import React, {useEffect} from 'react';
import * as Linking from 'expo-linking';
import PinScreen from '@/screens/PinScreen';
import MainViewScreen from '@/screens/MainViewScreen';
import {useAppContext} from '@/contexts/AppContext';

export const navigateToRoot = () => Linking.openURL(Linking.createURL('/'));

export const navigateToPin = (id: number) =>
  Linking.openURL(Linking.createURL(`/pin?id=${id}`));

export const NavigationRoot = () => {
  const url = Linking.useURL();

  const {state, setCurrentPinId} = useAppContext();
  const {currentPinId} = state;

  useEffect(() => {
    if (url) {
      const parsedUrl = Linking.parse(url);

      console.log(
        `Linked to app with hostname: ${parsedUrl.hostname}, path: ${parsedUrl.path} and data: ${JSON.stringify(
          parsedUrl.queryParams,
        )}`,
      );

      if (
        parsedUrl.path === 'pin' &&
        typeof parsedUrl.queryParams?.id === 'string'
      ) {
        setCurrentPinId(+parsedUrl.queryParams.id);
      } else {
        setCurrentPinId(null);
      }
    }
  }, [setCurrentPinId, url]);

  return (
    <>
      <MainViewScreen />

      {currentPinId !== null && <PinScreen id={currentPinId} />}
    </>
  );
};
