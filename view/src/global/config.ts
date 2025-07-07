//-Path: "redux/view/src/global/config.ts"

import { ReduxStore } from '@teachoco-official/redux';
import { stores } from './store';

export const reduxStore = new ReduxStore(stores);
