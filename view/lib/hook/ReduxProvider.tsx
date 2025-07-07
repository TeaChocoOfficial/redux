//-Path: "redux/lib/src/hook/ReduxProvider.tsx"
import { Provider } from 'react-redux';
import { ReduxStore } from './ReduxStore';
import { ReduxProviderProps } from '../types/redux';

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

// export const ReduxProvider: React.FC<ReduxProviderProps> = ({
//     store,
//     reduxStore,
//     children,
// }) => {
//     return (
//         <Provider store={store ?? (reduxStore ?? new ReduxStore({})).store}>
//             {children}
//         </Provider>
//     );
// };
