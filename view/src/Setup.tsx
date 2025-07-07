//-Path: "redux/view/src/Setup.tsx"
import App from './App';
import { reduxStore } from './global/config';
import { ReduxProvider } from '@teachoco-official/redux';

export default function Setup() {
    return (
        <ReduxProvider reduxStore={reduxStore}>
            <App />
        </ReduxProvider>
    );
}
