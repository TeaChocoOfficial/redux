//-Path: "redux/view/src/types/store.ts"

import { ProductType } from '../global/product';

export interface RootStore {
    product: ProductType[];
}

declare module '@teachoco-official/redux' {
    export interface RootState extends RootStore {}
}
