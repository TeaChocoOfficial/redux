//-Path: "redux/lib/src/hook/ReduxProvider.tsx"
import { Provider } from 'react-redux';
import { ReduxStore } from './ReduxStore';
import type { ReduxProviderProps } from '../types/redux';

export function ReduxProvider({
    store,
    reduxStore,
    ...props
}: ReduxProviderProps) {
    return (
        <Provider
            store={store ?? (reduxStore ?? new ReduxStore({})).store}
            {...props}
        />
    );
}
