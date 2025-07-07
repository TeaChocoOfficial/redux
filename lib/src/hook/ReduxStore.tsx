//-Path: "redux/lib/src/hook/ReduxStore.tsx"
import { logger } from 'redux-logger';
import { Obj } from '@teachoco-dev/cli';
import { ReduxSlice } from './ReduxSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, type Reducer } from 'redux';
import type { MiddlewareConfig, ReduxStores } from '../types/redux';
import type { GetDefaultMiddleware } from '../types/reduxjs_toolkit';

export class ReduxStore {
    constructor(
        public stores: ReduxStores,
        public devTools = false,
        public log = false,
    ) {}
    get reducer() {
        function storeToReducer(store: ReduxStores): Reducer {
            const reducerMap = Obj.reduce(
                store,
                (acc, key, value) => ({
                    ...acc,
                    [key]:
                        value instanceof ReduxSlice
                            ? value.slice.reducer
                            : storeToReducer(value),
                }),
                {} as Record<string, Reducer>,
            );
            return combineReducers(reducerMap);
        }
        return storeToReducer(this.stores);
    }
    private middleware(getDafualtMiddleware: GetDefaultMiddleware) {
        return getDafualtMiddleware();
    }

    public setMiddleware(middleware: MiddlewareConfig) {
        this.middleware = middleware;
    }
    private priMiddleware(getDafualtMiddleware: GetDefaultMiddleware) {
        const getDafual = this.middleware(getDafualtMiddleware);
        return this.devTools
            ? this.log
                ? getDafual.concat(logger)
                : getDafual.concat()
            : getDafual;
    }
    get store() {
        return configureStore({
            reducer: this.reducer,
            devTools: this.devTools,
            middleware: (getDefaultMiddleware) =>
                this.priMiddleware(getDefaultMiddleware),
        });
    }
}
