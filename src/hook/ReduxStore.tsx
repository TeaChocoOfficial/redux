//-Path: "redux/src/hook/ReduxStore.tsx"
import { Obj } from './obj';
import { logger } from 'redux-logger';
import { ReduxSlice } from './ReduxSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, type Reducer } from 'redux';
import type { MiddlewareConfig, ReduxStores } from '../types/redux';
import type { GetDefaultMiddleware } from '../types/reduxjs_toolkit';

export class ReduxStore {
    constructor(
        public store: ReduxStores,
        public devTools = false,
        public log = false,
    ) {}
    private getReducer() {
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
        return storeToReducer(this.store);
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
    public getStore() {
        return configureStore({
            devTools: this.devTools,
            reducer: this.getReducer(),
            middleware: (getDefaultMiddleware) =>
                this.priMiddleware(getDefaultMiddleware),
        });
    }
}
