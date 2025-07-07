//-Path: "redux/src/types/reduxjs_toolkit.ts"
import type { UnknownAction } from 'redux';
import type { ThunkMiddleware } from '@reduxjs/toolkit';

type IsImmutableFunc = (value: any) => boolean;

type IgnorePaths = readonly (string | RegExp)[];

interface SerializableStateInvariantMiddlewareOptions {
    isSerializable?: (value: any) => boolean;
    getEntries?: (value: any) => [string, any][];
    ignoredActions?: string[];
    ignoredActionPaths?: (string | RegExp)[];
    ignoredPaths?: (string | RegExp)[];
    warnAfter?: number;
    ignoreState?: boolean;
    ignoreActions?: boolean;
    disableCache?: boolean;
}

interface ImmutableStateInvariantMiddlewareOptions {
    isImmutable?: IsImmutableFunc;
    ignoredPaths?: IgnorePaths;
    warnAfter?: number;
}

interface ActionCreatorInvariantMiddlewareOptions {
    isActionCreator?: (action: unknown) => action is Function & {
        type?: unknown;
    };
}

interface ThunkOptions<E = any> {
    extraArgument: E;
}

interface GetDefaultMiddlewareOptions {
    thunk?: boolean | ThunkOptions;
    immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
    serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
    actionCreatorCheck?: boolean | ActionCreatorInvariantMiddlewareOptions;
}

type ExcludeFromTuple<T, E, Acc extends unknown[] = []> = T extends [
    infer Head,
    ...infer Tail,
]
    ? ExcludeFromTuple<Tail, E, [...Acc, ...([Head] extends [E] ? [] : [Head])]>
    : Acc;

declare class Tuple<Items extends ReadonlyArray<unknown> = []> extends Array<
    Items[number]
> {
    constructor(length: number);
    constructor(...items: Items);
    static get [Symbol.species](): any;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(
        items: Tuple<AdditionalItems>,
    ): Tuple<[...Items, ...AdditionalItems]>;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(
        items: AdditionalItems,
    ): Tuple<[...Items, ...AdditionalItems]>;
    concat<AdditionalItems extends ReadonlyArray<unknown>>(
        ...items: AdditionalItems
    ): Tuple<[...Items, ...AdditionalItems]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(
        items: Tuple<AdditionalItems>,
    ): Tuple<[...AdditionalItems, ...Items]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(
        items: AdditionalItems,
    ): Tuple<[...AdditionalItems, ...Items]>;
    prepend<AdditionalItems extends ReadonlyArray<unknown>>(
        ...items: AdditionalItems
    ): Tuple<[...AdditionalItems, ...Items]>;
}

type ThunkMiddlewareFor<
    S,
    O extends GetDefaultMiddlewareOptions = {},
> = O extends {
    thunk: false;
}
    ? never
    : O extends {
          thunk: {
              extraArgument: infer E;
          };
      }
    ? ThunkMiddleware<S, UnknownAction, E>
    : ThunkMiddleware<S, UnknownAction>;

export type GetDefaultMiddleware<S = any> = <
    O extends GetDefaultMiddlewareOptions = {
        thunk: true;
        immutableCheck: true;
        serializableCheck: true;
        actionCreatorCheck: true;
    },
>(
    options?: O,
) => Tuple<ExcludeFromTuple<[ThunkMiddlewareFor<S, O>], never>>;
