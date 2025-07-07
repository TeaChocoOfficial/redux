//-Path: "redux/view/src/global/product.ts"
import { PayAction, ReduxSlice } from '@teachoco-official/redux';

export type ProductType = {
    id: number;
    name: string;
    price: number;
};

const initialState: ProductType[] = [
    {
        id: 1,
        name: 'Product',
        price: 2000,
    },
    {
        id: 2,
        name: 'Product 2',
        price: 3000,
    },
];

export const productSlice = new ReduxSlice('product', initialState, {
    AddProduct(state, action: PayAction<ProductType>) {
        return [...state, action.payload];
    },
});

export const { AddProduct } = productSlice.useActions();

export const useProduct = ReduxSlice.useSelect((state) => state.product);
