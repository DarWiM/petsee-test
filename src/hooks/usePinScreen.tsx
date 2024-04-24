import {useCallback, useMemo, useRef} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import useSnapPoints from '@/hooks/useSnapPoints';
import {useAppContext} from '@/contexts/AppContext';

export const usePinScreen = (id: number) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedIndex = useSharedValue(0);
  const snapPoints = useSnapPoints();

  const {state, setCurrentPinId} = useAppContext();

  const data = useMemo(() => {
    return state.data?.find(item => item.id === id);
  }, [id, state.data]);

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
