import {useMemo} from 'react';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function useSnapPoints(): [number, number] {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  return useMemo(
    () => [frame.height / 2, frame.height - insets.top],
    [frame.height, insets.top],
  );
}

export default useSnapPoints;
