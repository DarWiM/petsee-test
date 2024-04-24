import {useMemo} from 'react';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {EdgeInsets} from 'react-native-safe-area-context/src/SafeArea.types';

const MAP_HORIZONTAL_OFFSET = 0.1;
const MAP_VERTICAL_OFFSET = 0.1;

function useMapPadding() {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  return useMemo((): EdgeInsets => {
    const verticalOffset = frame.height * MAP_VERTICAL_OFFSET;
    const horizontalOffset = frame.width * MAP_HORIZONTAL_OFFSET;

    return {
      top: verticalOffset + insets.top,
      bottom: verticalOffset + insets.bottom,
      left: horizontalOffset + insets.left,
      right: horizontalOffset + insets.right,
    };
  }, [
    frame.height,
    frame.width,
    insets.bottom,
    insets.left,
    insets.right,
    insets.top,
  ]);
}

export default useMapPadding;
