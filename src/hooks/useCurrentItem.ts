import {useAppContext} from '@/contexts/AppContext';
import {useMemo} from 'react';

const useCurrentItem = () => {
  const {state} = useAppContext();

  return useMemo(() => {
    return state.data?.find(item => item.id === state.currentPinId);
  }, [state.currentPinId, state.data]);
};

export default useCurrentItem;
