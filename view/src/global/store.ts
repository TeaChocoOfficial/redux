//-Path: "redux/view/src/global/store.ts"
import { productSlice } from './product';
import { ReduxStores } from '@teachoco-official/redux';

export const stores: ReduxStores = {
    product: productSlice,
};
