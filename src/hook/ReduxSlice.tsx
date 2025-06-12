//-Path: "redux/src/hook/ReduxSlice.tsx"
import type {
    Slice,
    SliceSelectors,
    ReducerCreators,
    SliceCaseReducers,
    CaseReducerActions,
    ActionReducerMapBuilder,
    ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { Obj } from './obj';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../types/redux';
import { useDispatch, useSelector } from 'react-redux';

export class ReduxSlice<
    State,
    CR extends SliceCaseReducers<State>,
    Name extends string,
    ReducerPath extends string,
    Selectors extends SliceSelectors<State> = SliceSelectors<State>,
> {
    slice: Slice<State, CR, Name, ReducerPath, Selectors>;

    constructor(
        public name: Name,
        public initialState: State | (() => State),
        public reducers:
            | ValidateSliceCaseReducers<State, CR>
            | ((creators: ReducerCreators<State>) => CR),
        public extraReducers?: (
            builder: ActionReducerMapBuilder<State>,
        ) => void,
        public selectors?: Selectors,
        public reducerPath?: ReducerPath,
    ) {
        this.slice = createSlice({
            name,
            reducers,
            selectors,
            reducerPath,
            initialState,
            extraReducers,
        });
    }

    useActions<
        ReducerActions extends CaseReducerActions<CR, Name>,
        Actions extends {
            [K in keyof CR]: () => (
                payload?: ReturnType<ReducerActions[K]>['payload'],
            ) => ReturnType<ReducerActions[K]>;
        },
    >(): Actions {
        const { actions } = this.slice;

        return Obj.reduce(
            actions,
            (acc, key, action) => ({
                ...acc,
                [key]: () => {
                    const dispatch = useDispatch();
                    return (payload: Parameters<typeof action>[0]) =>
                        dispatch(action(payload));
                },
            }),
            {} as Actions,
        );
    }
    static useSelect<Selected = unknown>(
        selector: (state: RootState) => Selected,
    ): () => Selected {
        return () => useSelector(selector);
    }
}
