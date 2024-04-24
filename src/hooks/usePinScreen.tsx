import {useCallback, useRef} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import useSnapPoints from '@/hooks/useSnapPoints';
import {useAppContext} from '@/contexts/AppContext';
import useCurrentItem from '@/hooks/useCurrentItem';

export const usePinScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedIndex = useSharedValue(0);
  const snapPoints = useSnapPoints();

  const {setCurrentPinId} = useAppContext();

  const data = useCurrentItem();

  const onPressClose = useCallback(() => bottomSheetRef.current?.close(), []);

  const onClose = useCallback(() => {
    setCurrentPinId(null);
  }, [setCurrentPinId]);

  return {
    bottomSheetRef,
    animatedIndex,
    snapPoints,
    data,
    onPressClose,
    onClose,
  };
};
