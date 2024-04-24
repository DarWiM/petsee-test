import {Dispatch} from 'react';
import {DataItem} from '@/api/fetchData';
import {TActions} from './actions';

export interface IAppState {
  data: DataItem[] | null;
  isLoading: boolean;
  currentPinId: number | null;
}

export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<TActions>;
}
