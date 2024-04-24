import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {ActionType, TActions} from './actions';
import {IAppContext, IAppState} from './types';

export * from './actions';
export * from './types';

export const initialState: IAppState = {
  data: null,
  isLoading: false,
  currentPinId: null,
  isMapReady: false,
};

const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: IAppState, action: TActions) => {
  switch (action.type) {
    case ActionType.SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case ActionType.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case ActionType.SET_CURRENT_PIN_ID: {
      return {
        ...state,
        currentPinId: action.payload,
      };
    }

    case ActionType.SET_IS_MAP_READY: {
      return {
        ...state,
        isMapReady: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const AppContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const {state, dispatch} = useContext(AppContext);

  const actions = useMemo(
    () => ({
      setData: (payload: IAppState['data']) => {
        dispatch({type: ActionType.SET_DATA, payload});
      },
      setIsLoading: (payload: IAppState['isLoading']) => {
        dispatch({type: ActionType.SET_IS_LOADING, payload});
      },
      setCurrentPinId: (payload: IAppState['currentPinId']) => {
        dispatch({type: ActionType.SET_CURRENT_PIN_ID, payload});
      },
      setIsMapReady: (payload: IAppState['isMapReady']) => {
        dispatch({type: ActionType.SET_IS_MAP_READY, payload});
      },
    }),
    [dispatch],
  );

  return {
    state,
    ...actions,
  };
};
