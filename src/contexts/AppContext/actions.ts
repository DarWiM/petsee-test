import {DataItem} from '@/api/fetchData';

type TActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionType {
  SET_DATA = 'SET_DATA',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_CURRENT_PIN_ID = 'SET_CURRENT_PIN_ID',
  SET_IS_MAP_READY = 'SET_IS_MAP_READY',
}

type TActionPayload = {
  [ActionType.SET_DATA]: DataItem[] | null;
  [ActionType.SET_IS_LOADING]: boolean;
  [ActionType.SET_CURRENT_PIN_ID]: number | null;
  [ActionType.SET_IS_MAP_READY]: boolean;
};

export type TActions =
  TActionMap<TActionPayload>[keyof TActionMap<TActionPayload>];
