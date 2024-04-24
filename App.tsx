import React from 'react';
import {StatusBar} from 'expo-status-bar';
import styled from 'styled-components/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {baseCss} from '@/styles';
import {AppContextProvider} from '@/contexts/AppContext';
import {NavigationRoot} from '@/navigation';

// noinspection JSUnusedGlobalSymbols
export default function App() {
  return (
    <RootView>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar style="auto" />
        <AppContextProvider>
          <NavigationRoot />
        </AppContextProvider>
      </SafeAreaProvider>
    </RootView>
  );
}

const RootView = styled(GestureHandlerRootView)`
  ${baseCss.flex};
  background: #fff;
`;
