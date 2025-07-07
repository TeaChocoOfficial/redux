//-Path: "redux/lib/src/types/redux.ts"
import { ProviderProps } from 'react-redux';
import { ReduxSlice } from '../hook/ReduxSlice';
import { ReduxStore } from '../hook/ReduxStore';
import { GetDefaultMiddleware } from './reduxjs_toolkit';
import { Store, Action, UnknownAction, PayloadAction } from '@reduxjs/toolkit';

export type ReduxProviderProps<
    A extends Action<string> = UnknownAction,
    S = unknown,
> = Omit<ProviderProps<A, S>, 'store'> & {
    store?: Store<S, A>;
    reduxStore: ReduxStore;
};

export interface RootState {
    [key: string]: any; // เทียบเท่า type RootState = any
}

export type MiddlewareConfig = (
    getDafualtMiddleware: GetDefaultMiddleware,
) => ReturnType<GetDefaultMiddleware>;

export type PayAction<
    Payload = void,
    T extends string = string,
    M = never,
    E = never,
> = PayloadAction<Payload, T, M, E>;

export interface ReduxStores {
    [key: string]: ReduxSlice<any, any, any, any, any> | ReduxStores;
}
